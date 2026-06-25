import { Router } from 'express'

import {
  getCalendarEvents,
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
} from '../controllers/calendar_events.controller.js'
import { authenticateToken } from '../middlewares/auth.middleware.js'
import { validate } from '../middlewares/validate.js'
import {
  createCalendarEventSchema,
  updateCalendarEventSchema,
} from '../schemas/calendar_events_schema.js'

const router = Router()

router.get('/', authenticateToken, getCalendarEvents)
router.post('/', authenticateToken, validate(createCalendarEventSchema), createCalendarEvent)
router.patch('/:id', authenticateToken, validate(updateCalendarEventSchema), updateCalendarEvent)
router.delete('/:id', authenticateToken, deleteCalendarEvent)

export default router
