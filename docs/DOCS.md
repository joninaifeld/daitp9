# Documentación del proyecto

## Información general

- **Nombre del proyecto:** DAITP9
- **Descripción breve:** API REST desarrollada en Node.js y Express para gestionar autenticación, usuarios y publicaciones. Incluye registro, inicio de sesión, consulta y actualización de perfil, y operaciones CRUD sobre posts.
- **Tipo de API:** API propia
- **URL base de la API:** `http://localhost:3000/api`

## Endpoints utilizados

| Endpoint | Método HTTP | Descripción |
|---|---|---|
| `/api/auth/register` | POST | Registra un nuevo usuario y devuelve sus datos junto con un token JWT. |
| `/api/auth/login` | POST | Inicia sesión con email y contraseña, y devuelve los datos del usuario junto con un token JWT. |
| `/api/user/perfil` | GET | Obtiene el perfil del usuario autenticado. |
| `/api/user/perfil` | PATCH | Actualiza el perfil del usuario autenticado. |
| `/api/post` | GET | Obtiene el listado completo de publicaciones. |
| `/api/post/:id` | GET | Obtiene una publicación específica por su identificador. |
| `/api/post` | POST | Crea una nueva publicación. |
| `/api/post/:id` | PATCH | Actualiza una publicación existente por su identificador. |
| `/api/post/:id` | DELETE | Elimina una publicación existente por su identificador. |

## Notas

- Los endpoints de usuarios y posts protegidos requieren autenticación mediante JWT.
- La API utiliza Supabase como servicio externo para persistencia de datos.
