import { Router } from 'express'
import PostController from '../controllers/post-controller.js'
import { authMiddleware } from "../middlewares/auth-middleware.js"
import { validatePostBody } from '../middlewares/type-middleware.js'

const router = Router()

/* #swagger.tags = ['Post']
	#swagger.summary = 'Listar publicaciones'
	#swagger.description = 'Obtiene el listado completo de publicaciones.'
	#swagger.responses[200] = { description: 'Lista de posts devuelta correctamente.', schema: [{ $ref: '#/definitions/Post' }] }
	#swagger.responses[500] = { description: 'Error interno del servidor.' }
*/
router.get('/', PostController.getAll)

/* #swagger.tags = ['Post']
	#swagger.summary = 'Obtener post por id'
	#swagger.description = 'Obtiene una publicación específica por su identificador.'
	#swagger.parameters['id'] = { in: 'path', description: 'Identificador del post', required: true, type: 'integer' }
	#swagger.responses[200] = { description: 'Post devuelto correctamente.', schema: { $ref: '#/definitions/Post' } }
	#swagger.responses[404] = { description: 'Post no encontrado.' }
	#swagger.responses[500] = { description: 'Error interno del servidor.' }
*/
router.get('/:id', PostController.getById)

/* #swagger.tags = ['Post']
	#swagger.summary = 'Crear post'
	#swagger.description = 'Crea una nueva publicación. Requiere autenticación.'
	#swagger.security = [{ "bearerAuth": [] }]
	#swagger.parameters['body'] = { in: 'body', required: true, description: 'Datos del post a crear', schema: { date: 'string', likes: 'integer', caption: 'string', imgUrl: 'string', userId: 'integer' } }
	#swagger.responses[201] = { description: 'Post creado correctamente.', schema: { $ref: '#/definitions/Post' } }
	#swagger.responses[400] = { description: 'Datos faltantes o inválidos.' }
	#swagger.responses[500] = { description: 'Error interno del servidor.' }
*/
router.post('/', authMiddleware, validatePostBody, PostController.create)

/* #swagger.tags = ['Post']
	#swagger.summary = 'Actualizar post'
	#swagger.description = 'Actualiza una publicación existente. Requiere autenticación.'
	#swagger.security = [{ "bearerAuth": [] }]
	#swagger.parameters['id'] = { in: 'path', description: 'Identificador del post', required: true, type: 'integer' }
	#swagger.parameters['body'] = { in: 'body', required: true, description: 'Datos del post a actualizar', schema: { date: 'string', likes: 'integer', caption: 'string', imgUrl: 'string', userId: 'integer' } }
	#swagger.responses[200] = { description: 'Post actualizado correctamente.', schema: { $ref: '#/definitions/Post' } }
	#swagger.responses[400] = { description: 'Datos faltantes o inválidos.' }
	#swagger.responses[404] = { description: 'Post no encontrado.' }
	#swagger.responses[500] = { description: 'Error interno del servidor.' }
*/
router.patch('/:id', authMiddleware, validatePostBody, PostController.update)

/* #swagger.tags = ['Post']
	#swagger.summary = 'Eliminar post'
	#swagger.description = 'Elimina una publicación existente. Requiere autenticación.'
	#swagger.security = [{ "bearerAuth": [] }]
	#swagger.parameters['id'] = { in: 'path', description: 'Identificador del post', required: true, type: 'integer' }
	#swagger.responses[204] = { description: 'Post eliminado correctamente.' }
	#swagger.responses[404] = { description: 'Post no encontrado.' }
	#swagger.responses[500] = { description: 'Error interno del servidor.' }
*/
router.delete('/:id', authMiddleware, PostController.remove)

export default router
