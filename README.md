# Jardín Online

Sistema web para la consulta y venta de plantas ornamentales. El proyecto busca centralizar el catálogo, la disponibilidad de productos y el registro y seguimiento de pedidos de una tienda.

## Problema y usuarios objetivo

El sistema aborda la dispersión de la información de productos, existencias y pedidos. Sus actores definidos son **Cliente**, **Vendedor** y **Administrador**. El informe de Hito 4 señala que Cliente y Vendedor se utilizaron en la demostración; el panel completo de Administración permanece como diseño pendiente.

## Módulos y estado

| Módulo | Funcionalidades descritas | Estado según el informe Hito 4 |
|---|---|---|
| Catálogo de Productos | Consultar plantas, precios y disponibilidad; seleccionar productos y usar el carrito. | Funcional en la versión demostrada. |
| Ventas | Registrar pedidos y detalles, validar stock y actualizar existencias. | Funcional en la versión demostrada. |
| Administración | Gestión prevista de usuarios, productos, categorías e inventario. | Diseñado; panel completo pendiente. |

El panel del Vendedor permite consultar pedidos, actualizar su estado y consultar un reporte básico, según el informe.

## Tecnologías

- Interfaz: HTML, CSS y JavaScript.
- Servidor: Node.js y Express.
- Base de datos: MySQL 8.0.
- Librerías: `bcryptjs`, `dotenv`, `express`, `express-session` y `mysql2`.
- Herramienta de desarrollo: Visual Studio Code.

## Requisitos del entorno

- Node.js y npm instalados.
- MySQL 8.0 en ejecución.
- Acceso a una instancia MySQL y permisos para crear/usar la base de datos.
- Navegador web moderno.

## Instalación y ejecución local

1. Clona o descarga este repositorio.
2. Crea la base de datos ejecutando [`database/schema.sql`](database/schema.sql) en MySQL Workbench.
3. Copia `.env.example` como `.env`.
4. Completa en `.env` los datos de conexión MySQL y un valor privado para `SESSION_SECRET`.
5. Instala dependencias:

   ```bash
   npm install
   ```

6. Inicia el servidor:

   ```bash
   npm start
   ```

7. Abre `http://localhost:3000` en el navegador.

**Importante:** el puerto debe coincidir con el configurado en el servidor. Verifica `servidor.js` antes de cambiarlo; si el proyecto no define explícitamente el puerto 3000, ajusta esta dirección al puerto que muestre la consola. No publiques el archivo `.env`.

## Estructura

```text
Jardinonline/
├── public/                 # Páginas HTML de la interfaz
├── servidor.js             # Servidor Express y rutas API
├── package.json
├── package-lock.json
├── .env.example            # Plantilla de configuración, sin secretos
├── database/
│   ├── schema.sql
│   └── README.md
├── docs/
│   ├── vision-y-alcance.md
│   ├── requisitos.md
│   ├── arquitectura.md
│   ├── modelo-de-datos.md
│   ├── planificacion/
│   ├── diagramas/
│   ├── manuales/
│   ├── equipo/
│   └── referencias/
└── .github/
```

## Documentación

- [Visión y alcance](docs/vision-y-alcance.md)
- [Requisitos](docs/requisitos.md)
- [Arquitectura](docs/arquitectura.md)
- [Modelo de datos](docs/modelo-de-datos.md)
- [Planificación](docs/planificacion/planificacion.md)
- [Seguimiento](docs/planificacion/seguimiento.md)
- [Integrantes y roles](docs/equipo/integrantes-y-roles.md)
- [Acuerdos de trabajo](docs/equipo/acuerdos-de-trabajo.md)
- [Diagramas y referencia al informe](docs/diagramas/README.md)
- [Manual de instalación](docs/manuales/instalacion-y-ejecucion.md)
- [Informe Hito 4 original](docs/referencias/Informe_Jardin_Online_Hito4.pdf)

## Estado de pruebas

El paquete recibido no incluye una suite automatizada de pruebas. La carpeta `tests/` contiene una lista de verificación manual inicial; no se debe interpretar como evidencia de pruebas ya ejecutadas.

## Responsable del proyecto

Proyecto desarrollado individualmente por **Luis Mario Medrano Zeballos**. Las responsabilidades de análisis, diseño, desarrollo, base de datos, pruebas y documentación corresponden al autor. Véase [integrante y responsabilidades](docs/equipo/integrantes-y-roles.md).

## Seguridad

No subir `.env`, contraseñas, tokens, datos personales ni volcados de producción. La base incluida es solo de estructura. Consultar [SECURITY.md](SECURITY.md).
