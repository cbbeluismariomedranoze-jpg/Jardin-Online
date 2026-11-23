# Manual de instalación y ejecución

## Requisitos previos
Node.js/npm y MySQL 8.0 instalados y en ejecución.

## Preparar la base de datos
Ejecutar `database/schema.sql` en MySQL Workbench. El archivo crea la base y las cinco tablas sin insertar usuarios ni datos personales.

## Configurar el entorno
1. Copiar `.env.example` a `.env`.
2. Introducir credenciales locales de MySQL.
3. Establecer `SESSION_SECRET` con un valor aleatorio privado.
4. No compartir ni subir `.env`.

## Instalar y arrancar
Desde la raíz del proyecto:

```bash
npm install
npm start
```

La aplicación sirve los archivos estáticos desde `public/`. Revisar el mensaje de inicio en consola y abrir en el navegador el puerto configurado en `servidor.js`.

## Solución de problemas
- Error de conexión: revisar que MySQL esté activo y que las variables DB_* sean correctas.
- Error de acceso: comprobar que el usuario MySQL tenga permisos sobre `jardin_online`.
- Dependencias faltantes: ejecutar `npm install`.
- Sesión no segura en despliegue: configurar HTTPS y una estrategia adecuada de almacenamiento de sesiones antes de producción.
