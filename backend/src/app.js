import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173'

app.use(
  cors({
    origin: FRONTEND_ORIGIN,
  }),
)
app.use(express.json())
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
  res.json({
    message: 'PawPal Backend Running',
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
