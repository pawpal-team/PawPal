import { Router } from 'express'

import {
  getCalendarEvents,
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
} from '../controllers/calendar_events.controller.js'
import { authenticateToken } from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/', authenticateToken, getCalendarEvents)
router.post('/', authenticateToken, createCalendarEvent)
router.patch('/:id', authenticateToken, updateCalendarEvent)
router.delete('/:id', authenticateToken, deleteCalendarEvent)

export default router
