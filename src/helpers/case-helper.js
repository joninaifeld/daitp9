export function toSnakeCase(key) {
    return key.replace(/([A-Z])/g, '_$1').toLowerCase()
}

export function keysToSnakeCase(obj) {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
        return obj
    }

    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [toSnakeCase(key), value])
    )
}
