import { Router } from 'express'
import AuthService from '../services/user-service.js'
    
const router = Router()
const svc = new AuthService()

router.post('/register', async (req, res) => {
})

router.post('/login', async (req, res) => {
})