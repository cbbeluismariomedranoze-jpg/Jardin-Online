
require('dotenv').config();

const express = require('express');
const mysql = require('mysql2/promise');

const bcrypt = require('bcryptjs');
const session = require('express-session');

const app = express();

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 2
    }
}));

app.use(express.static('public'));
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT || 3306)
});



app.get('/api/productos', async (req, res) => {
    try {
        const [productos] = await db.query(`
            SELECT
                p.id_producto,
                p.nombre,
                p.descripcion,
                p.precio,
                p.stock,
                c.nombre AS categoria
            FROM productos p
            LEFT JOIN categorias c
            ON p.id_categoria = c.id_categoria
        `);

        res.json(productos);
    } catch (error) {
        console.error('Error al consultar productos:', error.message);
        res.status(500).json({
            mensaje: 'Error al obtener productos'
        });
    }
});

app.post('/api/registro', async (req, res) => {
    try {
        const { nombre, correo, contrasena } = req.body;

        if (!nombre || !correo || !contrasena) {
            return res.status(400).json({
                mensaje: 'Completa todos los campos'
            });
        }

        if (contrasena.length < 8) {
            return res.status(400).json({
                mensaje: 'La contraseña debe tener al menos 8 caracteres'
            });
        }

        const contrasenaHash = await bcrypt.hash(contrasena, 12);

        await db.execute(
            `INSERT INTO usuarios
            (nombre, correo, contrasena_hash, rol)
            VALUES (?, ?, ?, 'cliente')`,
            [nombre, correo, contrasenaHash]
        );

        res.status(201).json({
            mensaje: 'Cliente registrado correctamente'
        });

    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                mensaje: 'El correo ya está registrado'
            });
        }

        console.error(error);
        res.status(500).json({
            mensaje: 'Error al registrar cliente'
        });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { correo, contrasena } = req.body || {};

        if (typeof correo !== 'string' ||
            typeof contrasena !== 'string' ||
            !correo.trim() || !contrasena) {
            return res.status(400).json({
                mensaje: 'Completa todos los campos'
            });
        }

        const [usuarios] = await db.execute(
            'SELECT * FROM usuarios WHERE correo = ? LIMIT 1',
            [correo.trim()]
        );

        const usuario = usuarios[0];

        if (!usuario || !usuario.activo ||
            !(await bcrypt.compare(
                contrasena,
                usuario.contrasena_hash
            ))) {
            return res.status(401).json({
                mensaje: 'Correo o contraseña incorrectos'
            });
        }

        req.session.usuario = {
            id: usuario.id_usuario,
            nombre: usuario.nombre,
            rol: usuario.rol
        };

        res.json({
            mensaje: 'Inicio de sesión correcto',
            usuario: {
                nombre: usuario.nombre,
                rol: usuario.rol
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al iniciar sesión'
        });
    }
});

app.get('/api/mi-sesion', (req, res) => {
    if (!req.session.usuario) {
        return res.status(401).json({
            mensaje: 'No has iniciado sesión'
        });
    }

    res.json({
        mensaje: 'Sesión activa',
        usuario: req.session.usuario
    });
});

app.post('/api/pedidos', async (req, res) => {
    const usuario = req.session?.usuario;

    if (!usuario || usuario.rol !== 'cliente') {
        return res.status(403).json({
            mensaje: 'Debes iniciar sesión como cliente'
        });
    }

    const items = req.body?.items;

    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
            mensaje: 'El carrito está vacío'
        });
    }

    const resumen = new Map();

    for (const item of items) {
        const id = Number(item.id_producto);
        const cantidad = Number(item.cantidad);

        if (!Number.isSafeInteger(id) || id <= 0 ||
            !Number.isSafeInteger(cantidad) || cantidad <= 0) {
            return res.status(400).json({
                mensaje: 'Datos del carrito no válidos'
            });
        }

        const nuevaCantidad =
            (resumen.get(id) || 0) + cantidad;

        if (!Number.isSafeInteger(nuevaCantidad)) {
            return res.status(400).json({
                mensaje: 'Cantidad no válida'
            });
        }

        resumen.set(id, nuevaCantidad);
    }

    let conexion;

    try {
        conexion = await db.getConnection();
        await conexion.beginTransaction();

        const [pedido] = await conexion.execute(
            `INSERT INTO pedidos (id_cliente, estado)
             VALUES (?, 'pendiente')`,
            [usuario.id]
        );

        let total = 0;

        const productosOrdenados =
            [...resumen].sort((a, b) => a[0] - b[0]);

        for (const [idProducto, cantidad] of productosOrdenados) {
            const [filas] = await conexion.execute(
                `SELECT precio, stock FROM productos
                 WHERE id_producto = ? FOR UPDATE`,
                [idProducto]
            );

            if (!filas.length || filas[0].stock < cantidad) {
                await conexion.rollback();

                return res.status(409).json({
                    mensaje: 'Producto inexistente o stock insuficiente'
                });
            }

            const precio = Number(filas[0].precio);

            await conexion.execute(
                `INSERT INTO detalle_pedido
                (id_pedido, id_producto, cantidad, precio_unitario)
                VALUES (?, ?, ?, ?)`,
                [pedido.insertId, idProducto, cantidad, precio]
            );

            await conexion.execute(
                `UPDATE productos
                 SET stock = stock - ?
                 WHERE id_producto = ?`,
                [cantidad, idProducto]
            );

            total += precio * cantidad;
        }

        await conexion.commit();

        res.status(201).json({
            mensaje: 'Pedido registrado correctamente',
            id_pedido: pedido.insertId,
            total: Number(total.toFixed(2))
        });

    } catch (error) {
        if (conexion) await conexion.rollback();

        console.error('Error al registrar pedido:', error);

        res.status(500).json({
            mensaje: 'No se pudo registrar el pedido'
        });
    } finally {
        if (conexion) conexion.release();
    }
});

app.get('/api/vendedor/pedidos', async (req, res) => {

    if (!req.session?.usuario ||
        req.session.usuario.rol !== 'vendedor') {
        return res.status(403).json({
            mensaje: 'Acceso exclusivo para vendedores'
        });
    }

    try {
        const [pedidos] = await db.query(`
            SELECT
                p.id_pedido,
                u.nombre AS cliente,
                p.fecha_pedido,
                p.estado,
                COALESCE(
                    SUM(d.cantidad * d.precio_unitario),
                    0
                ) AS total
            FROM pedidos p
            INNER JOIN usuarios u
                ON p.id_cliente = u.id_usuario
            LEFT JOIN detalle_pedido d
                ON p.id_pedido = d.id_pedido
            GROUP BY
                p.id_pedido,
                u.nombre,
                p.fecha_pedido,
                p.estado
            ORDER BY p.id_pedido DESC
        `);

        res.json(pedidos);

    } catch (error) {
        console.error('Error al consultar pedidos:', error);

        res.status(500).json({
            mensaje: 'Error al obtener los pedidos'
        });
    }
});

app.patch('/api/vendedor/pedidos/:id/estado', async (req, res) => {

    const usuario = req.session?.usuario;

    if (!usuario || usuario.rol !== 'vendedor') {
        return res.status(403).json({
            mensaje: 'Acceso exclusivo para vendedores'
        });
    }

    const idPedido = Number(req.params.id);
    const nuevoEstado = req.body?.estado;

    const transiciones = {
        confirmado: 'pendiente',
        entregado: 'confirmado'
    };

    if (!Number.isSafeInteger(idPedido) || idPedido <= 0 ||
        !Object.hasOwn(transiciones, nuevoEstado)) {
        return res.status(400).json({
            mensaje: 'Pedido o estado no válido'
        });
    }

    try {
        const [resultado] = await db.execute(
            `UPDATE pedidos
             SET estado = ?, id_vendedor = ?
             WHERE id_pedido = ? AND estado = ?`,
            [
                nuevoEstado,
                usuario.id,
                idPedido,
                transiciones[nuevoEstado]
            ]
        );

        if (resultado.affectedRows === 0) {
            return res.status(409).json({
                mensaje: 'El pedido no existe o no está en el estado requerido'
            });
        }

        res.json({
            mensaje: 'Estado actualizado correctamente',
            id_pedido: idPedido,
            estado: nuevoEstado
        });

    } catch (error) {
        console.error('Error al actualizar pedido:', error);

        res.status(500).json({
            mensaje: 'No se pudo actualizar el pedido'
        });
    }
});

app.get('/api/vendedor/reporte', async (req, res) => {
    const usuario = req.session?.usuario;

    if (!usuario || usuario.rol !== 'vendedor') {
        return res.status(403).json({
            mensaje: 'Acceso exclusivo para vendedores'
        });
    }

    try {
        const [filas] = await db.query(`
            SELECT
                COUNT(DISTINCT p.id_pedido) AS total_pedidos,

                COUNT(DISTINCT CASE
                    WHEN p.estado = 'pendiente'
                    THEN p.id_pedido
                END) AS pendientes,

                COUNT(DISTINCT CASE
                    WHEN p.estado = 'entregado'
                    THEN p.id_pedido
                END) AS entregados,

                COALESCE(SUM(
                    CASE
                        WHEN p.estado = 'entregado'
                        THEN d.cantidad * d.precio_unitario
                        ELSE 0
                    END
                ), 0) AS total_ventas

            FROM pedidos p
            LEFT JOIN detalle_pedido d
                ON p.id_pedido = d.id_pedido
        `);

        res.json(filas[0]);

    } catch (error) {
        console.error('Error al generar reporte:', error);

        res.status(500).json({
            mensaje: 'Error al generar reporte'
        });
    }
});

async function iniciarServidor() {
    try {
        await db.query('SELECT 1');
        console.log('MySQL conectado correctamente');

        app.listen(3000, () => {
            console.log('Servidor iniciado en http://localhost:3000');
        });
    } catch (error) {
        console.error('Error de conexión:', error.message);
    }
}

iniciarServidor();
