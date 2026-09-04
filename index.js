import express from "express"
import cors from "cors"
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import swaggerUi from 'swagger-ui-express'
import UserRouter from "./src/routes/user-route.js"
import PostRouter from "./src/routes/post-route.js"
import AuthRouter from "./src/routes/auth-route.js"
import { config } from "./src/config/env.js"

const app = express()
const port = config.PORT
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const swaggerPath = path.join(__dirname, 'swagger', 'swagger-output.json')
const swaggerDocument = fs.existsSync(swaggerPath)
	? JSON.parse(fs.readFileSync(swaggerPath, 'utf-8'))
	: {}

app.use(cors())
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/api/user', UserRouter)
app.use('/api/post', PostRouter)
app.use('/api/auth', AuthRouter)

app.listen(port, () => {
	console.log(`Server listening on http://localhost:${port}`)
})