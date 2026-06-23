import dotenv from 'dotenv'

dotenv.config()

// DB_PASSWORD 不列為必填，因為 macOS 本機 PostgreSQL 開發環境常見無密碼設定。
const requiredEnvVars = ['DB_HOST', 'DB_PORT', 'DB_NAME', 'DB_USER', 'JWT_SECRET']

const missingEnvVars = requiredEnvVars.filter((envVar) => {
  const value = process.env[envVar]
  return typeof value !== 'string' || value.trim() === ''
})

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:')

  missingEnvVars.forEach((envVar) => {
    console.error(`- ${envVar}`)
  })

  console.error('Please check your backend/.env file before starting the server.')
  process.exit(1)
}

const PORT = process.env.PORT || 3000
const { default: app } = await import('./app.js')

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
