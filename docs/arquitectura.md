# Arquitectura del sistema

## Vista general

La versión web documentada utiliza una arquitectura de tres capas:

1. **Interfaz:** HTML, CSS y JavaScript; presenta catálogo, carrito, formularios y panel del Vendedor.
2. **Servidor / API:** Node.js y Express; gestiona rutas HTTP, sesiones, validaciones y reglas de negocio.
3. **Persistencia:** MySQL; almacena usuarios, categorías, productos, pedidos y detalles de pedido.

## Componentes observados en el código entregado

- `public/index.html`: página de catálogo.
- `public/login.html`: inicio de sesión.
- `public/registro.html`: registro de clientes.
- `public/vendedor.html`: interfaz del Vendedor.
- `servidor.js`: servidor Express, conexión mediante `mysql2/promise`, sesiones con `express-session`, hash/verificación de contraseñas con `bcryptjs` y carga de variables con `dotenv`.

## Flujo principal de compra

1. El Cliente consulta `GET /api/productos`.
2. Inicia sesión mediante `POST /api/login`.
3. El servidor mantiene los datos básicos de sesión.
4. El Cliente envía los artículos del carrito a `POST /api/pedidos`.
5. El servidor valida la sesión, cantidades y stock; usa una transacción MySQL, registra el pedido y sus detalles y descuenta existencias.
6. El Vendedor consulta y atiende pedidos desde su interfaz.

## Configuración y decisiones

- La conexión MySQL se configura mediante variables de entorno (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT`).
- La clave de sesión se configura con `SESSION_SECRET`.
- Las consultas parametrizadas se utilizan en operaciones con datos del usuario.
- El proceso de compra usa transacción y bloqueo de filas al consultar disponibilidad.
- Los secretos deben mantenerse fuera del repositorio.

## Límites conocidos

El informe indica que el panel completo de Administración está pendiente, que la política de respaldos y el despliegue HTTPS deben completarse, y que cancelación/restauración de stock y pruebas de concurrencia requieren más verificación. No se deben describir como terminadas.

## Diagrama

La documentación gráfica de arquitectura y los modelos UML/UWE se encuentran referenciados en [`diagramas/README.md`](diagramas/README.md) y en el informe Hito 4 conservado en `docs/referencias/`.
