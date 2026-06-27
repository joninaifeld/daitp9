import { Router } from 'express'
import PostController from '../controllers/post-controller.js'
import { validatePostBody } from '../middlewares/type-middleware.js'

const router = Router()

router.get('/', PostController.getAll)
router.get('/:id', PostController.getById)
router.post('/', validatePostBody, PostController.create)
router.patch('/:id', validatePostBody, PostController.update)
router.delete('/:id', PostController.remove)

export default router
