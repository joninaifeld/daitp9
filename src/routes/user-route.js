import { Router } from 'express'
import UserController from '../controllers/user-controller.js'
import { validateUserBody } from '../middlewares/type-middleware.js'

const router = Router()

router.get('/perfil', UserController.getPerfil)

router.patch('/perfil', validateUserBody, UserController.updatePerfil)
