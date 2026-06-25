import express from 'express'
import cors from 'cors'
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import petRoutes from './routes/pet.routes.js'

const app = express()
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173'

app.use(
  cors({
    origin: FRONTEND_ORIGIN,
  }),
)
app.use(express.json())
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/pets', petRoutes)

app.get('/', (req, res) => {
  res.json({
    message: 'PawPal Backend Running',
  })
})

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(400).json({
      message: 'Invalid JSON format',
    })
  }

  console.error(error)

  return res.status(500).json({
    message: 'Internal server error',
  })
})

export default app
