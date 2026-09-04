import { Router } from 'express'
import AuthController from '../controllers/auth-controller.js'
    
const router = Router()

/* #swagger.tags = ['Auth']
	#swagger.summary = 'Registrar usuario'
	#swagger.description = 'Registra un nuevo usuario y devuelve sus datos junto con un token JWT.'
	#swagger.parameters['body'] = { in: 'body', required: true, description: 'Datos necesarios para crear la cuenta', schema: { username: 'string', fullName: 'string', email: 'string', password: 'string' } }
	#swagger.responses[201] = { description: 'Usuario creado correctamente. Devuelve data y token.', schema: { $ref: '#/definitions/AuthResponse' } }
	#swagger.responses[409] = { description: 'El email ya existe.' }
	#swagger.responses[500] = { description: 'Error interno del servidor.' }
*/
router.post('/register', /* #swagger.tags = ['Auth'] */ AuthController.register)

/* #swagger.tags = ['Auth']
	#swagger.summary = 'Iniciar sesión'
	#swagger.description = 'Inicia sesión con email y contraseña y devuelve los datos del usuario junto con un token JWT.'
	#swagger.parameters['body'] = { in: 'body', required: true, description: 'Credenciales de acceso', schema: { email: 'string', password: 'string' } }
	#swagger.responses[200] = { description: 'Login correcto. Devuelve data y token.', schema: { $ref: '#/definitions/AuthResponse' } }
	#swagger.responses[401] = { description: 'Credenciales inválidas.' }
	#swagger.responses[500] = { description: 'Error interno del servidor.' }
*/
router.post('/login', /* #swagger.tags = ['Auth'] */ AuthController.login)

export default router