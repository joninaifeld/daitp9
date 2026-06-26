import express from "express"
import cors from "cors"
import UserRouter from "./src/routes/user-route.js"
import PostRouter from "./src/routes/post-route.js"

const app = express()
const port = 3000 // El puerto 3000 (http://localhost:3000)

// Middlewares
app.use(cors()) // Middleware de CORS.
app.use(express.json()) // Middleware para parsear y comprender JSON.

app.use('/api/user', UserRouter)
app.use('/api/post', PostRouter)

// Inicio el Server y lo pongo a escuchar.
app.listen(port, () => {
	console.log(`Server listening on port ${port}`)
})