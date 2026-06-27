import { Router } from 'express'
import PostController from '../controllers/post-controller.js'
import { authMiddleware } from "../middlewares/auth-middleware.js"
import { validatePostBody } from '../middlewares/type-middleware.js'

const router = Router()

router.get('/', PostController.getAll)
router.get('/:id', PostController.getById)
router.post('/', authMiddleware, validatePostBody, PostController.create)
router.patch('/:id', authMiddleware, validatePostBody, PostController.update)
router.delete('/:id', authMiddleware, PostController.remove)

export default router
