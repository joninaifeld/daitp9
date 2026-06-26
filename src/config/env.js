import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const envPath = path.join(__dirname, '.env')

function parseEnvValue(value = '') {
  const trimmed = value.trim()
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1)
  }
  return trimmed
}

const env = {}
if (fs.existsSync(envPath)) {
  const raw = fs.readFileSync(envPath, 'utf8')
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const [key, ...rest] = trimmed.split('=')
    env[key] = parseEnvValue(rest.join('='))
  }
}

export const config = {
  SUPABASE_URL: env.NEXT_PUBLIC_SUPABASE_URL,
  SUPABASE_SECRET: env.SECRET_KEY,
  PORT: env.PORT || 3000,
  LOG_FILE_PATH: env.LOG_FILE_PATH || './logs',
  LOG_FILE_NAME: env.LOG_FILE_NAME || 'app.log',
  LOG_TO_FILE_ENABLED: env.LOG_TO_FILE_ENABLED || 'false',
  LOG_TO_CONSOLE_ENABLED: env.LOG_TO_CONSOLE_ENABLED || 'true',
}
