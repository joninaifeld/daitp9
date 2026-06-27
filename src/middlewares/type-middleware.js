import logHelper from "../helpers/log-helper.js"

function isValidTimestamptz(value) {
    return typeof value === 'string' && !Number.isNaN(Date.parse(value))
}

function isInteger(value) {
    return Number.isInteger(value)
}

function isString(value) {
    return typeof value === "string";
}

export function validatePostBody(req, res, next) {
    const isFullObj = req.method === 'POST' || req.method === 'PUT'
    const post = req.body

    if (!post || typeof post !== 'object' || Array.isArray(post)) {
        logHelper.log(new Error('Post must be an object'))
        return res.status(400).send('Post must be an object')
    }

    const fieldDefs = [
        { key: 'date', isRequired: isFullObj, validator: isValidTimestamptz, message: 'date must be a valid timestamptz string' },
        { key: 'likes', isRequired: false, validator: isInteger, message: 'likes must be an integer' },
        { key: 'caption', isRequired: false, validator: isString, message: 'caption must be a string' },
        { key: 'img_url', isRequired: isFullObj, validator: isString, message: 'img_url must be a string' },
        { key: 'user_id', isRequired: isFullObj, validator: isInteger, message: 'user_id must be an integer' }
    ]
    const receivedFields = Object.keys(post)

    const missingFields = fieldDefs.filter(field => 
        field.isRequired && !receivedFields.includes(field.key)
    )
    const extraFields = receivedFields.filter(field => 
        !fieldDefs.some(f => f.key === field)
    )

    if (missingFields.length > 0 || extraFields.length > 0) {
        const details = []
        if (missingFields.length > 0) {
            details.push(`missing fields: ${missingFields.join(', ')}`)
        }
        if (extraFields.length > 0) {
            details.push(`unexpected fields: ${extraFields.join(', ')}`)
        }
        logHelper.log(new Error(`Invalid post shape: ${details.join('; ')}`))
        return res.status(400).send(`Invalid post shape: ${details.join('; ')}`)
    }

    for (const definition of fieldDefs) {
        if (!(definition.key in post)) continue

        if (!definition.validator(post[definition.key])) {
            logHelper.log(new Error(
                `Validation failed for field ${definition.key}: ${definition.message}`
            ))
            return res.status(400).send(definition.message)
        }
    }

    next()
}
