import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { createUser, findUserByEmail } from '../services/auth.service.js'

const SALT_ROUNDS = 10
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const JWT_SECRET = process.env.JWT_SECRET

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
  const trimmedPassword = password.trim()

  if (!trimmedName || !normalizedEmail || !trimmedPassword) {
    return res.status(400).json({
      message: 'name, email, password are required',
    })
  }

  if (!emailRegex.test(normalizedEmail)) {
    return res.status(400).json({
      message: 'invalid email format',
    })
  }

  try {
    const existingUser = await findUserByEmail(normalizedEmail)

    if (existingUser) {
      return res.status(409).json({
        message: 'Email already exists',
      })
    }

    const hashedPassword = await bcrypt.hash(trimmedPassword, SALT_ROUNDS)
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

export async function login(req, res) {
  const { email, password } = req.body

  if (email == null || password == null) {
    return res.status(400).json({
      message: 'email, password are required',
    })
  }

  if (typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).json({
      message: 'email, password must be strings',
    })
  }

  const normalizedEmail = email.trim().toLowerCase()
  const trimmedPassword = password.trim()

  if (!normalizedEmail || !trimmedPassword) {
    return res.status(400).json({
      message: 'email, password are required',
    })
  }

  try {
    const user = await findUserByEmail(normalizedEmail)

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password',
      })
    }

    const isPasswordValid = await bcrypt.compare(trimmedPassword, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid email or password',
      })
    }

    if (!JWT_SECRET) {
      console.error('JWT_SECRET is not configured')

      return res.status(500).json({
        message: 'Failed to login',
      })
    }

    const token = jwt.sign(
      {
        sub: user.id,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: '7d' },
    )

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar_url: user.avatar_url,
        created_at: user.created_at,
      },
    })
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      message: 'Failed to login',
    })
  }
}
