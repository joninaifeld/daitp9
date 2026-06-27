import AuthService from '../services/auth-service.js'
import LogHelper from '../helpers/log-helper.js'

const svc = new AuthService()

const AuthController = {
    async register(req, res) {
        try {
            const { username, fullName, email, password } = req.body
            const { data, token } = await svc.register(username, fullName, email, password)
            return res.status(201).json({ data, token })
        } catch (err) {
            await LogHelper.log(err)

            if (err.message === "Email already exists") {
                return res.status(409).send(err.message)
            }

            return res.status(500).send("Internal error")
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body
            const { data, token } = await svc.login(email, password)
            return res.status(200).json({ data, token })
        } catch (err) {
            await LogHelper.log(err)
            if (err.message === "Invalid credentials") {
                return res.status(401).send(err.message)
            }
            return res.status(500).send("Internal error")
        }
    },
}

export default AuthController