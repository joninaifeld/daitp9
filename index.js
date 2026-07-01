import express from "express"
import cors from "cors"
import UserRouter from "./src/routes/user-route.js"
import PostRouter from "./src/routes/post-route.js"
import AuthRouter from "./src/routes/auth-route.js"
import { config } from "./src/config/env.js"

const app = express()
const port = config.PORT

app.use(cors())
app.use(express.json())

app.use('/api/user', UserRouter)
app.use('/api/post', PostRouter)
app.use('/api/auth', AuthRouter)

app.listen(port, () => {
	console.log(`Server listening on http://localhost:${port}`)
})