import fs from 'fs'
import path from 'path'
import { config } from '../config/env.js'

const { promises: fsPromises } = fs

class LogHelper {
	constructor() {
		this.filePath = config.LOG_FILE_PATH || './logs'
		this.fileName = config.LOG_FILE_NAME || 'app.log'
		this.logToFileEnabled = String(config.LOG_TO_FILE_ENABLED || 'false').toLowerCase() === 'true'
		this.logToConsoleEnabled = String(config.LOG_TO_CONSOLE_ENABLED || 'true').toLowerCase() === 'true'
	}

	async log(errorObject) {
		try {
			const timestamp = new Date().toISOString()
			let message = ''

			if (errorObject instanceof Error) {
				message = errorObject.stack || errorObject.message
			} else if (typeof errorObject === 'string') {
				message = errorObject
			}

			const logLine = `${timestamp} - ${message}\n`

			if (this.logToConsoleEnabled) {
				if (errorObject instanceof Error) {
					console.error(logLine)
				} else {
					console.log(logLine)
				}
			}

			if (this.logToFileEnabled) {
				const dir = this.filePath
				const file = path.join(dir, this.fileName)
				await fsPromises.mkdir(dir, { recursive: true })
				await fsPromises.appendFile(file, logLine, { encoding: 'utf8' })
			}
		} catch (err) {
			console.error('LogHelper failed:', err)
		}
	}
}

export default new LogHelper()