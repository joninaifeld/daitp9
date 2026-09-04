import swaggerAutogen from 'swagger-autogen'

const doc = {
	info: {
		title: 'DAITP9 API',
		description: 'API REST para autenticación, usuarios y publicaciones.',
	},
	host: 'localhost:3000',
	schemes: ['http'],
	consumes: ['application/json'],
	produces: ['application/json'],
	tags: [
		{
			name: 'Auth',
			description: 'Endpoints de autenticación y registro de usuarios.',
		},
		{
			name: 'User',
			description: 'Endpoints relacionados con el perfil de usuario.',
		},
		{
			name: 'Post',
			description: 'Endpoints para administrar publicaciones.',
		},
	],
	securityDefinitions: {
		bearerAuth: {
			type: 'apiKey',
			in: 'header',
			name: 'Authorization',
			description: 'JWT con formato Bearer token',
		},
	},
	definitions: {
		User: {
			type: 'object',
			description: 'Representa un usuario de la aplicación.',
			properties: {
				id: { type: 'integer', description: 'Identificador único del usuario', example: 1 },
				username: { type: 'string', description: 'Nombre de usuario', example: 'juanperez' },
				full_name: { type: 'string', description: 'Nombre completo del usuario', example: 'Juan Pérez' },
				email: { type: 'string', description: 'Correo electrónico', example: 'juan@example.com' },
				password: { type: 'string', description: 'Contraseña cifrada almacenada en la base de datos', example: '$2b$10$...' },
				pfp: { type: 'string', description: 'URL de la foto de perfil', example: 'https://example.com/pfp.jpg' },
				bio: { type: 'string', description: 'Biografía del usuario', example: 'Amante de la programación' },
				verified: { type: 'boolean', description: 'Indica si el usuario está verificado', example: false },
				followers: { type: 'integer', description: 'Cantidad de seguidores', example: 120 },
				following: { type: 'integer', description: 'Cantidad de cuentas seguidas', example: 80 },
			},
			required: ['id', 'username', 'full_name', 'email', 'password', 'pfp', 'bio', 'verified', 'followers', 'following'],
		},
		Post: {
			type: 'object',
			description: 'Representa una publicación dentro de la plataforma.',
			properties: {
				id: { type: 'integer', description: 'Identificador único del post', example: 1 },
				user_id: { type: 'integer', description: 'Identificador del usuario autor del post', example: 1 },
				img_url: { type: 'string', description: 'URL de la imagen publicada', example: 'https://example.com/post.jpg' },
				caption: { type: 'string', description: 'Texto descriptivo de la publicación', example: 'Un gran día' },
				likes: { type: 'integer', description: 'Cantidad de likes', example: 35 },
				date: { type: 'string', format: 'date-time', description: 'Fecha y hora de la publicación', example: '2026-09-04T12:00:00Z' },
			},
			required: ['id', 'user_id', 'img_url', 'caption', 'likes', 'date'],
		},
		AuthResponse: {
			type: 'object',
			description: 'Respuesta de autenticación que devuelve datos de usuario y token JWT.',
			properties: {
				data: {
					type: 'object',
					description: 'Datos del usuario autenticado',
					properties: {
						username: { type: 'string', description: 'Nombre de usuario', example: 'juanperez' },
						full_name: { type: 'string', description: 'Nombre completo', example: 'Juan Pérez' },
						email: { type: 'string', description: 'Correo electrónico', example: 'juan@example.com' },
						pfp: { type: 'string', description: 'Foto de perfil', example: 'https://example.com/pfp.jpg' },
						bio: { type: 'string', description: 'Biografía', example: 'Amante de la programación' },
						verified: { type: 'boolean', description: 'Estado de verificación', example: false },
						followers: { type: 'integer', description: 'Cantidad de seguidores', example: 120 },
						following: { type: 'integer', description: 'Cantidad de seguidos', example: 80 },
					},
				},
				token: { type: 'string', description: 'Token JWT de autenticación', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
			},
			required: ['data', 'token'],
		},
	},
}

const outputFile = './swagger/swagger-output.json'
const endpointsFiles = [
	'./index.js',
	'./src/routes/auth-route.js',
	'./src/routes/user-route.js',
	'./src/routes/post-route.js',
]

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
	console.log('Swagger specification generated')
})
