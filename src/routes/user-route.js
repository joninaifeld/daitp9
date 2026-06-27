import { Router } from 'express'
import UserController from '../controllers/user-controller.js'
import { authMiddleware } from "../middlewares/auth-middleware.js"
import { validateUserBody } from '../middlewares/type-middleware.js'

const router = Router()

router.get('/perfil', authMiddleware, UserController.getPerfil)

router.patch('/perfil', authMiddleware, validateUserBody, UserController.updatePerfil)
