# Seguridad

## Reportar vulnerabilidades
No publiques detalles de una vulnerabilidad en un Issue público si puede comprometer cuentas, datos o el servidor. Contacta de forma privada a los mantenedores del repositorio.

## Reglas de seguridad del proyecto
- Nunca subir `.env`, contraseñas, tokens, claves de sesión ni credenciales de MySQL.
- No publicar volcados de base de datos que contengan datos personales o hashes de contraseñas.
- Utilizar consultas parametrizadas para datos recibidos del usuario.
- Mantener dependencias actualizadas y revisar alertas de seguridad.
- Configurar HTTPS y una gestión persistente y segura de sesiones antes del despliegue público.
- Usar datos ficticios en capturas, demostraciones y pruebas compartidas.
