import { Router } from 'express'
import UserService from '../services/user-service.js'

const router = Router()
const svc = new UserService()

router.get('/perfil', async (req, res) => {
})

router.put('/perfil', async (req, res) => {
})
