import jwt from 'jsonwebtoken'
import logHelper from "../helpers/log-helper.js"

export async function authMiddleware(req, res, next) {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '')
        const payload = jwt.verify(token, process.env.JWT_SECRET)

        req.user = payload
        next()
    } catch (err) {
        await logHelper.log(err)
        if (err.name === 'TokenExpiredError') {
            return res.status(401).send("Token expired")
        }
        return res.status(401).send("Invalid token")
    }
}

export async function adminMiddleware(req, res, next) {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '')
        const payload = jwt.verify(token, process.env.JWT_SECRET)

        if (!payload.isAdmin) {
            return res.status(403).send("Access denied")
        }

        req.user = payload
        next()
    } catch (err) {
        await logHelper.log(err)
        return res.status(401).send("Invalid token")
    }
}