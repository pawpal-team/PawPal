import { Router } from 'express'

import { getCurrentUser } from '../controllers/users.controller.js'
import { authenticateToken } from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/me', authenticateToken, getCurrentUser)

export default router
