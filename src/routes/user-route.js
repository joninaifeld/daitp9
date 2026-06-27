import { Router } from 'express'
import UserController from '../controllers/user-controller.js'

const router = Router()

router.get('/perfil', UserController.getPerfil)

router.patch('/perfil', UserController.updatePerfil)
