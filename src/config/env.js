import dotenv from 'dotenv'

dotenv.config()

export const config = {
    SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '',
    SUPABASE_SECRET: process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_ANON_KEY || '',
    JWT_SECRET: process.env.JWT_SECRET || '',
    PORT: process.env.PORT || 3000,
    LOG_FILE_PATH: process.env.LOG_FILE_PATH || './logs/app.log',
    LOG_REGION: process.env.LOG_REGION || 'UTC',
    LOG_TO_FILE_ENABLED: process.env.LOG_TO_FILE_ENABLED || 'false',
    LOG_TO_CONSOLE_ENABLED: process.env.LOG_TO_CONSOLE_ENABLED || 'true',
}