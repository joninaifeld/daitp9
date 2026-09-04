# Documentación del proyecto

## Información general

- **Nombre del proyecto:** DAITP9
- **Descripción breve:** API REST desarrollada en Node.js y Express para gestionar autenticación, usuarios y publicaciones. Incluye registro, inicio de sesión, consulta y actualización de perfil, y operaciones CRUD sobre posts.
- **Tipo de API:** API propia
- **URL base de la API:** `http://localhost:3000/api`

## Descripción del proyecto seleccionado

DAITP9 es una API REST construida con Node.js, Express y Supabase para gestionar autenticación, usuarios y publicaciones. Permite registrar usuarios, iniciar sesión, consultar y actualizar perfiles, y realizar operaciones CRUD sobre posts.

## Justificación de la API elegida

Se eligió una API propia porque el proyecto necesitaba centralizar la lógica de autenticación y el acceso a datos en una capa backend controlada. Además, el uso de una API REST facilita el consumo desde cualquier frontend y permite documentar claramente cada endpoint con Swagger.

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

## Explicación de la implementación de Swagger

La documentación se implementó con `swagger-autogen` y `swagger-ui-express`.

1. En [swagger/swagger.js](swagger/swagger.js) se definió la metadata de la API, el esquema de seguridad JWT, y los modelos reutilizables `User`, `Post` y `AuthResponse`.
2. Se agregaron comentarios de Swagger en las rutas para documentar método HTTP, ruta, descripción, parámetros, body y respuestas.
3. Se configuró [index.js](index.js) para exponer la documentación visual en la ruta `/api-docs`.
4. La especificación se genera en `swagger/swagger-output.json` y luego es consumida por Swagger UI.

## Problemas encontrados y cómo fueron solucionados

- **Problema:** los comentarios de Swagger estaban en una sola línea y eran difíciles de leer.
	**Solución:** se reescribieron en formato multilínea, ubicados antes de cada endpoint.

- **Problema:** faltaba documentar los modelos de datos usados por la API.
	**Solución:** se definieron modelos en `definitions` para `User`, `Post` y `AuthResponse`.

- **Problema:** Swagger UI necesitaba cargar una especificación generada previamente.
	**Solución:** se configuró `swagger/swagger.js` para generar `swagger-output.json` y `index.js` para leer ese archivo y servirlo en `/api-docs`.

- **Problema:** los endpoints protegidos necesitaban dejar claro que usan JWT.
	**Solución:** se definió `bearerAuth` en `securityDefinitions` y se aplicó `#swagger.security` en las rutas que requieren autenticación.

## Evidencias de las pruebas realizadas

- Se validó la sintaxis de los archivos modificados sin errores en el editor.
- Se verificó que las rutas documentadas incluyen sus métodos, parámetros, body y respuestas.
- Se confirmó que la configuración de Swagger apunta a los archivos correctos del proyecto.
- Se dejó disponible la ruta `/api-docs` para visualizar la documentación generada.

## Notas

- Los endpoints de usuarios y posts protegidos requieren autenticación mediante JWT.
- La API utiliza Supabase como servicio externo para persistencia de datos.
