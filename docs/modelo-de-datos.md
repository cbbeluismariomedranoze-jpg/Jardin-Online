# Modelo de datos

La base MySQL entregada contiene cinco tablas. El esquema reproducible sin registros personales está en [`database/schema.sql`](../database/schema.sql).

| Tabla | Propósito y atributos principales |
|---|---|
| `usuarios` | Identidad, nombre, correo único, hash de contraseña, rol y estado activo. |
| `categorias` | Nombre y descripción de categorías de plantas. |
| `productos` | Nombre, descripción, precio, stock, imagen y referencia opcional a categoría. |
| `pedidos` | Cliente, vendedor opcional, fecha y estado del pedido. |
| `detalle_pedido` | Pedido, producto, cantidad y precio unitario de la compra. |

## Relaciones

- Una categoría puede agrupar varios productos; `productos.id_categoria` referencia `categorias.id_categoria`.
- Un usuario puede aparecer como cliente en varios pedidos; `pedidos.id_cliente` referencia `usuarios.id_usuario`.
- Un usuario puede aparecer como vendedor de varios pedidos; `pedidos.id_vendedor` referencia `usuarios.id_usuario` y admite `NULL`.
- Un pedido contiene varios detalles; `detalle_pedido.id_pedido` referencia `pedidos.id_pedido`.
- Un producto puede aparecer en varios detalles; `detalle_pedido.id_producto` referencia `productos.id_producto`.

## Restricciones observadas

- `usuarios.correo` es único.
- Los roles son `administrador`, `vendedor` y `cliente`.
- Los estados de pedido son `pendiente`, `confirmado`, `entregado` y `cancelado`.
- La base define restricciones CHECK para cantidades positivas, precios no negativos y stock no negativo.

## Nota de seguridad

El dump recibido incluía registros de usuarios y hashes de contraseña. Por privacidad, no se incorporaron esos registros al repositorio preparado. Se conserva únicamente la estructura de tablas y relaciones.
