import { Router } from 'express'
import {
  getGrowthRecords,
  createGrowthRecord,
  updateGrowthRecord,
  deleteGrowthRecord,
} from '../controllers/growth_records.controller.js'
import { authenticateToken } from '../middlewares/auth.middleware.js'
import { validate } from '../middlewares/validate.js'
import {
  createGrowthRecordSchema,
  updateGrowthRecordSchema,
} from '../schemas/growth_records.schema.js'

const router = Router()

router.get('/', authenticateToken, getGrowthRecords)
router.post('/', authenticateToken, validate(createGrowthRecordSchema), createGrowthRecord)
router.patch('/:id', authenticateToken, validate(updateGrowthRecordSchema), updateGrowthRecord)
router.delete('/:id', authenticateToken, deleteGrowthRecord)

export default router
