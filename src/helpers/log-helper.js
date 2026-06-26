import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { config } from '../config/env.js'

const { promises: fsPromises } = fs
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

class LogHelper {
	constructor() {
		const configuredPath = config.LOG_FILE_PATH || './logs/app.log'
		const projectRoot = path.resolve(__dirname, '..', '..')
		const resolvedPath = path.isAbsolute(configuredPath)
			? configuredPath
			: configuredPath.includes('..')
				? path.resolve(__dirname, configuredPath)
				: path.resolve(projectRoot, configuredPath)

		this.filePath = resolvedPath
		this.fileName = path.basename(this.filePath)
		this.logRegion = config.LOG_REGION || 'UTC'
		this.logToFileEnabled = String(config.LOG_TO_FILE_ENABLED || 'false').toLowerCase() === 'true'
		this.logToConsoleEnabled = String(config.LOG_TO_CONSOLE_ENABLED || 'true').toLowerCase() === 'true'
	}

	formatTimestamp(date) {
		const timeZone = this.logRegion || 'UTC'

		try {
			const formatter = new Intl.DateTimeFormat('sv-SE', {
				timeZone,
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
				hour12: false,
			})
			const parts = formatter.formatToParts(date)
			const values = Object.fromEntries(parts.map((part) => [part.type, part.value]))
			return `${values.year}-${values.month}-${values.day}T${values.hour}:${values.minute}:${values.second} (${timeZone})`
		} catch {
			return `${date.toISOString()} (${timeZone})`
		}
	}

	async log(errorObject) {
		try {
			const timestamp = this.formatTimestamp(new Date())
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
				const dir = path.dirname(this.filePath)
				await fsPromises.mkdir(dir, { recursive: true })
				await fsPromises.appendFile(this.filePath, logLine, { encoding: 'utf8' })
			}
		} catch (err) {
			console.error('LogHelper failed:', err)
		}
	}
}

export default new LogHelper()