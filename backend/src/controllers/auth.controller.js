import bcrypt from 'bcryptjs'
import { createUser, findUserByEmail } from '../services/auth.service.js'

const SALT_ROUNDS = 10

export async function register(req, res) {
  const { name, email, password } = req.body

  if (name == null || email == null || password == null) {
    return res.status(400).json({
      message: 'name, email, password are required',
    })
  }

  if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).json({
      message: 'name, email, password must be strings',
    })
  }

  const trimmedName = name.trim()
  const normalizedEmail = email.trim().toLowerCase()

  if (!trimmedName || !normalizedEmail || !password) {
    return res.status(400).json({
      message: 'name, email, password are required',
    })
  }

  try {
    const existingUser = await findUserByEmail(normalizedEmail)

    if (existingUser) {
      return res.status(409).json({
        message: 'Email already exists',
      })
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    const user = await createUser({
      name: trimmedName,
      email: normalizedEmail,
      password: hashedPassword,
    })

    return res.status(201).json({
      message: 'Register successful',
      user,
    })
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      message: 'Failed to register user',
    })
  }
}
