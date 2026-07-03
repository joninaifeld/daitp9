# Descripción estructura por capas
1. La route recive la request HTTP
2. La request pasa por los middlewares seleccionados
3. Si el middleware permite el next, el controller recive la request
4. El controller consigue la informacion necesaria y se la pasa al service
5. El service llama a la base de datos con la informacion obtenida, y la devuelve al controller (en caso de error el controller catchea)
6. Con la informacion conseguida y la base de datos actualizada, el controller hace la response con un status

# Estructura de las tablas usadas
1. posts
- id int primary identity
- user_id int [foreign key relation to users]
- img_url varchar
- caption varchar
- likes int
- date timestamptz
2. users
- id int primary identity 
- username varchar
- full_name varchar
- email varchar
- password varchar
- pfp varchar
- bio varchar
- verified bool
- followers int
- following int

# Endpoints desarrollados
- **GET** ```/api/user/perfil``` -> protegido  
*Devuelve el objeto de usuario con campos `id`, `username`, `full_name`, `email`, `password`, `pfp`, `bio`, `verified`, `followers`, `following`.*
- **PATCH** ```/api/user/perfil``` -> protegido  
*Devuelve el objeto de usuario actualizado con los mismos campos del perfil.*
- **POST** ```/api/auth/login``` -> publico  
*Devuelve `{ data: usuario, token: jwt }`. `data` incluye `username`, `full_name`, `email`, `pfp`, `bio`, `verified`, `followers`, `following`.*
- **POST** ```/api/auth/register``` -> publico  
*Devuelve `{ data: usuario, token: jwt }`. `data` incluye `username`, `full_name`, `email`, `pfp`, `bio`, `verified`, `followers`, `following`.*
- **GET** ```/api/post``` -> publico  
*Devuelve un arreglo de posts con campos `id`, `user_id`, `img_url`, `caption`, `likes`, `date`.*
- **GET** ```/api/post/:id``` -> publico  
*Devuelve un objeto post con campos `id`, `user_id`, `img_url`, `caption`, `likes`, `date`.*
- **POST** ```/api/post``` -> protegido  
*Devuelve el post creado con campos `id`, `user_id`, `img_url`, `caption`, `likes`, `date`.*
- **PATCH** ```/api/post/:id``` -> protegido  
*Devuelve el post actualizado con campos `id`, `user_id`, `img_url`, `caption`, `likes`, `date`.*
- **DELETE** ```/api/post/:id``` -> protegido  
*Devuelve `204 No Content` si se elimina*

# Configuración de JWT
- El token se genera con el payload ```{ id, email }```, la secret key del .env, y 1h de expiresIn
- Al verificarlo, si expiró o no existe el token, no pasa el middleware