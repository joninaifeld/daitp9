import logHelper from "./log-helper.js"
import { config } from "../config/env.js"
import jwt from 'jsonwebtoken'

class JwtHelper {
    constructor() {
        this.secret = config.JWT_SECRET || null
    }

    generate(payload, expiresIn = '1h') {
        try {
            if (!this.secret) {
                throw new Error('JWT secret is not defined')
            }
            return jwt.sign(payload, this.secret, { expiresIn })
        } catch (err) {
            logHelper.log(err)
            return null
        }
    }

    verify(token) {
        try {
            if (!this.secret) {
                throw new Error('JWT secret is not defined')
            }
            return jwt.verify(token, this.secret)
        } catch (err) {
            logHelper.log(err)
            return null
        }
    }
}

export default new JwtHelper()