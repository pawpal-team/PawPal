import { Router } from 'express'
import { register, login } from '../controllers/auth.controller.js'
import { validate } from '../middlewares/validate.js'
import { loginSchema, registerSchema } from '../schemas/auth_schema.js'

const router = Router()

router.post('/register', validate(registerSchema), register)
router.post('/login', validate(loginSchema), login)

export default router
