# Requisitos del sistema

Los estados siguientes reproducen la clasificación del informe Hito 4: demostrados, pendientes o no verificados. Son requisitos identificados en el informe, no una certificación de pruebas independientes.

## Requisitos funcionales

| ID | Requisito | Estado documentado |
|---|---|---|
| RF-01 | Permitir el acceso de usuarios según su rol. | Cliente y Vendedor utilizados; Administración pendiente. |
| RF-02 | Crear y gestionar usuarios y roles. | Pendiente en el panel de Administración. |
| RF-03 | Registrar y modificar productos. | Pendiente como función administrativa. |
| RF-04 | Gestionar categorías de productos. | Pendiente como función administrativa. |
| RF-05 | Ajustar manualmente las existencias. | Pendiente como función administrativa. |
| RF-06 | Consultar y buscar plantas. | Catálogo operativo; búsqueda según versión de interfaz. |
| RF-07 | Mostrar precio y disponibilidad. | Comprobado en el catálogo. |
| RF-08 | Seleccionar productos y cantidades. | Carrito y compra demostrados. |
| RF-09 | Registrar datos de clientes. | No verificado como función independiente. |
| RF-10 | Buscar clientes por datos personales. | Pendiente de verificación. |
| RF-11 | Restringir información según permisos. | Acceso por roles; auditoría pendiente. |
| RF-12 | Registrar pedidos con sus detalles. | Demostrado. |
| RF-13 | Comprobar y actualizar existencias. | Demostrado durante la compra. |
| RF-14 | Guardar cantidades y precios de compra. | Evidenciado en el pedido de demostración n.º 1. |
| RF-15 | Gestionar el estado de los pedidos. | Se utilizaron pendiente, confirmado y entregado. |
| RF-16 | Consultar compras y reportes. | Reporte básico del Vendedor verificado. |
| RF-17 | Restituir existencias al cancelar un pedido. | No se cuenta con evidencia de prueba completa. |

## Requisitos no funcionales

| ID | Requisito | Criterio / estado documentado |
|---|---|---|
| RNF-01 | Funcionar mediante navegador web. | Interfaz web implementada. |
| RNF-02 | Controlar el acceso según el rol. | Cliente y Vendedor utilizados; Administrador pendiente. |
| RNF-03 | Persistir información en una base relacional. | MySQL. |
| RNF-04 | Ofrecer una interfaz clara. | Interfaz navegable; continuar pruebas de usabilidad. |
| RNF-05 | Contar con respaldo y recuperación. | Política pendiente. |
| RNF-06 | Mantener coherencia del inventario. | Validación durante compra; ampliar pruebas. |
| RNF-07 | Proteger credenciales y comunicaciones. | Se documenta hash de contraseñas; HTTPS queda pendiente para despliegue. |

## Historias de usuario identificadas

- HU-01 Inicio de sesión.
- HU-02 Gestionar plantas (pendiente).
- HU-03 Gestionar categorías e inventario (pendiente).
- HU-04 Crear usuarios (pendiente).
- HU-05 Revisar ventas (diseño).
- HU-06 Registrar clientes (flujo independiente no demostrado).
- HU-07 Localizar clientes (diseño).
- HU-08 Realizar pedido (demostrado).
- HU-09 Atender pedido (demostrado).
- HU-10 Consultar pedidos (diseño; verificar interfaz completa).
- HU-11 Consultar catálogo (demostrado).

Fuente: Informe de Proyecto Hito 4, sección 4.
