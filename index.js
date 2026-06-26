import express from "express"
import cors from "cors"
import UserRouter from "./src/routes/user-route.js"
import PostRouter from "./src/routes/post-route.js"
import AuthRouter from "./src/routes/auth-route.js"
import { config } from "./src/config/env.js"

const app = express()
const port = config.PORT

// Middlewares
app.use(cors()) // Middleware de CORS.
app.use(express.json()) // Middleware para parsear y comprender JSON.

app.use('/api/user', UserRouter)
app.use('/api/post', PostRouter)
app.use('/api/auth', AuthRouter)

// Inicio el Server y lo pongo a escuchar.
app.listen(port, () => {
	console.log(`Server listening on port ${port}`)
})