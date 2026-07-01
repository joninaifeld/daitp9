import UserService from '../services/user-service.js'
import LogHelper from '../helpers/log-helper.js'

export default class UserController {
    static async getPerfil(req, res) {
        try {
            const userId = req.user?.id || req.body?.userId || req.query?.userId
            if (!userId) {
                return res.status(400).send('User id is required')
            }

            const user = await UserService.getPerfil(userId)
            if (!user) {
                return res.status(404).send('User not found')
            }

            return res.status(200).json(user)
        } catch (err) {
            await LogHelper.log(err)
            return res.status(500).send('Internal error')
        }
    }

    static async updatePerfil(req, res) {
        try {
            const userId = req.user?.id || req.body?.userId || req.query?.userId
            if (!userId) {
                return res.status(400).send('User id is required')
            }

            const updates = req.body
            if (!updates || typeof updates !== 'object' || Array.isArray(updates)) {
                return res.status(400).send('Invalid update payload')
            }

            const updatedUser = await UserService.updatePerfil(userId, updates)
            if (!updatedUser) {
                return res.status(404).send('User not found')
            }

            return res.status(200).json(updatedUser)
        } catch (err) {
            await LogHelper.log(err)
            return res.status(500).send('Internal error')
        }
    }
}
