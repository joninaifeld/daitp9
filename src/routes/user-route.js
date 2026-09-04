import { Router } from 'express'
import UserController from '../controllers/user-controller.js'
import { authMiddleware } from "../middlewares/auth-middleware.js"
import { validateUserBody } from '../middlewares/type-middleware.js'

const router = Router()

/* #swagger.tags = ['User']
	#swagger.summary = 'Obtener perfil'
	#swagger.description = 'Obtiene el perfil del usuario autenticado mediante JWT.'
	#swagger.security = [{ "bearerAuth": [] }]
	#swagger.responses[200] = { description: 'Perfil devuelto correctamente.', schema: { $ref: '#/definitions/User' } }
	#swagger.responses[400] = { description: 'Falta el identificador del usuario.' }
	#swagger.responses[404] = { description: 'Usuario no encontrado.' }
	#swagger.responses[500] = { description: 'Error interno del servidor.' }
*/
router.get('/perfil', /* #swagger.tags = ['User'] */ authMiddleware, UserController.getPerfil)

/* #swagger.tags = ['User']
	#swagger.summary = 'Actualizar perfil'
	#swagger.description = 'Actualiza el perfil del usuario autenticado mediante JWT.'
	#swagger.security = [{ "bearerAuth": [] }]
	#swagger.parameters['body'] = { in: 'body', required: true, description: 'Campos editables del perfil', schema: { username: 'string', fullName: 'string', email: 'string' } }
	#swagger.responses[200] = { description: 'Perfil actualizado correctamente.', schema: { $ref: '#/definitions/User' } }
	#swagger.responses[400] = { description: 'Datos inválidos o faltantes.' }
	#swagger.responses[404] = { description: 'Usuario no encontrado.' }
	#swagger.responses[500] = { description: 'Error interno del servidor.' }
*/
router.patch('/perfil', /* #swagger.tags = ['User'] */ authMiddleware, validateUserBody, UserController.updatePerfil)

export default router
