import bcrypt from 'bcryptjs'
import { createUser, findUserByEmail } from '../services/auth.service.js'

const SALT_ROUNDS = 10

export async function register(req, res) {
  const name = req.body.name?.trim()
  const email = req.body.email?.trim().toLowerCase()
  const password = req.body.password

  if (!name || !email || !password) {
    return res.status(400).json({
      message: 'name, email, password are required',
    })
  }

  try {
    const existingUser = await findUserByEmail(email)

    if (existingUser) {
      return res.status(409).json({
        message: 'Email already exists',
      })
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    const user = await createUser({ name, email, password: hashedPassword })

    return res.status(201).json({
      message: 'Register successful',
      user,
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to register user',
      error: error.message,
    })
  }
}
