import logHelper from "../helpers/log-helper.js"

function isValidTimestamptz(value) {
    return typeof value === 'string' && !Number.isNaN(Date.parse(value))
}

function isInteger(value) {
    return Number.isInteger(value)
}

function isString(value) {
    return typeof value === 'string'
}

function isEmail(value) {
    return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function resolveRequired(field, method) {
    if (typeof field.isRequired === 'function') {
        return field.isRequired(method)
    }
    return Boolean(field.isRequired)
}

export function validateBody(fieldDefs = [], entityName = 'body') {
    return (req, res, next) => {
        const method = req.method.toUpperCase()
        const payload = req.body

        if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
            const message = `${entityName} must be an object`
            logHelper.log(new Error(message))
            return res.status(400).send(message)
        }

        const receivedFields = Object.keys(payload)
        const missingFields = fieldDefs.filter(field => resolveRequired(field, method) && !receivedFields.includes(field.key))
        const extraFields = receivedFields.filter(field => !fieldDefs.some(def => def.key === field))

        if (missingFields.length > 0 || extraFields.length > 0) {
            const details = []
            if (missingFields.length > 0) {
                details.push(`missing fields: ${missingFields.map(field => field.key).join(', ')}`)
            }
            if (extraFields.length > 0) {
                details.push(`unexpected fields: ${extraFields.join(', ')}`)
            }

            const message = `Invalid ${entityName.toLowerCase()} shape: ${details.join('; ')}`
            logHelper.log(new Error(message))
            return res.status(400).send(message)
        }

        for (const definition of fieldDefs) {
            if (!Object.prototype.hasOwnProperty.call(payload, definition.key)) continue

            if (!definition.validator(payload[definition.key])) {
                logHelper.log(new Error(`Validation failed for field ${definition.key}: ${definition.message}`))
                return res.status(400).send(definition.message)
            }
        }

        next()
    }
}

export function validatePostBody(req, res, next) {
    const fieldDefs = [
        { key: 'date', isRequired: method => ['POST', 'PUT'].includes(method), validator: isValidTimestamptz, message: 'date must be a valid timestamptz string' },
        { key: 'likes', isRequired: false, validator: isInteger, message: 'likes must be an integer' },
        { key: 'caption', isRequired: false, validator: isString, message: 'caption must be a string' },
        { key: 'imgUrl', isRequired: method => ['POST', 'PUT'].includes(method), validator: isString, message: 'imgUrl must be a string' },
        { key: 'userId', isRequired: method => ['POST', 'PUT'].includes(method), validator: isInteger, message: 'userId must be an integer' }
    ]

    return validateBody(fieldDefs, 'Post')(req, res, next)
}

export function validateUserBody(req, res, next) {
    const fieldDefs = [
        { key: 'username', isRequired: false, validator: isString, message: 'username must be a string' },
        { key: 'fullName', isRequired: false, validator: isString, message: 'fullName must be a string' },
        { key: 'email', isRequired: false, validator: isEmail, message: 'email must be a valid email' }
    ]

    return validateBody(fieldDefs, 'User')(req, res, next)
}
