import crypto from 'crypto'
import LogHelper from './log-helper.js'

class HashHelper {
    constructor() {
        this.keyLen = 64
        this.digest = 'hex'
    }

    generateSalt() {
        return crypto.randomBytes(16).toString('hex')
    }

    hash(password) {
        try {
            const salt = this.generateSalt()
            const derived = crypto.scryptSync(password, salt, this.keyLen)
            return `${salt}:${derived.toString(this.digest)}`
        } catch (err) {
            LogHelper.log(err)
            return null
        }
    }

    compare(password, stored) {
        try {
            if (!stored || typeof stored !== 'string' || !stored.includes(':')) return false
            const [salt, key] = stored.split(':')
            const derived = crypto.scryptSync(password, salt, this.keyLen)
            const keyBuf = Buffer.from(key, this.digest)
            return crypto.timingSafeEqual(keyBuf, derived)
        } catch (err) {
            LogHelper.log(err)
            return false
        }
    }
}

export default new HashHelper()
