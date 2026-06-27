import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { createUser, findUserByEmail } from '../services/auth.service.js'

const SALT_ROUNDS = 10

export function createRegister({ createUser, findUserByEmail }) {
  return async function register(req, res) {
    const { name, email, password } = req.body

    try {
      const existingUser = await findUserByEmail(email)

      if (existingUser) {
        return res.status(409).json({
          message: '此 Email 已被註冊',
        })
      }

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
      const user = await createUser({
        name,
        email,
        password: hashedPassword,
      })

      return res.status(201).json({
        message: '註冊成功',
        user,
      })
    } catch (error) {
      console.error(error)

      return res.status(500).json({
        message: '註冊失敗，請稍後再試',
      })
    }
  }
}

export function createLogin({
  findUserByEmail,
  comparePassword = bcrypt.compare,
  signToken = jwt.sign,
  getJwtSecret = () => process.env.JWT_SECRET,
}) {
  return async function login(req, res) {
    const { email, password } = req.body

    try {
      const user = await findUserByEmail(email)

      if (!user) {
        return res.status(401).json({
          message: '帳號或密碼錯誤',
        })
      }

      const isPasswordValid = await comparePassword(password, user.password)

      if (!isPasswordValid) {
        return res.status(401).json({
          message: '帳號或密碼錯誤',
        })
      }

      const jwtSecret = getJwtSecret()

      if (!jwtSecret) {
        console.error('JWT_SECRET is not configured')

        return res.status(500).json({
          message: '登入失敗，請稍後再試',
        })
      }

      const token = signToken(
        {
          sub: user.id,
          email: user.email,
        },
        jwtSecret,
        { expiresIn: '7d' },
      )

      return res.status(200).json({
        message: '登入成功',
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
        message: '登入失敗，請稍後再試',
      })
    }
  }
}

export const register = createRegister({ createUser, findUserByEmail })
export const login = createLogin({ findUserByEmail })
