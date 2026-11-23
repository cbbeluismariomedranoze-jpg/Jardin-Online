# Base de datos

La aplicación utiliza MySQL 8.0 y la base `jardin_online`.

## Inicialización

1. Inicia MySQL.
2. Abre MySQL Workbench o un cliente SQL.
3. Ejecuta `schema.sql`.
4. Configura las variables `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` y `DB_PORT` en el archivo `.env` local.

El archivo `schema.sql` contiene únicamente la estructura: cinco tablas (`usuarios`, `categorias`, `productos`, `pedidos` y `detalle_pedido`), claves primarias, claves foráneas y restricciones. No contiene registros personales ni hashes de contraseñas. Para probar el sistema, registra un usuario de prueba desde la aplicación y carga productos de prueba manualmente o mediante datos ficticios.

Relaciones identificadas en el dump recibido:
- `categorias` 1 — N `productos`.
- `usuarios` 1 — N `pedidos` como cliente.
- `usuarios` 1 — N `pedidos` como vendedor (relación opcional en el pedido).
- `pedidos` 1 — N `detalle_pedido`.
- `productos` 1 — N `detalle_pedido`.

Nota: el dump original incluía datos de usuarios de prueba y hashes de contraseñas. No se incluye en este repositorio por privacidad; conservarlo localmente y no publicarlo.
