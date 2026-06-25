import { Router } from 'express'
import {
  getGrowthRecords,
  createGrowthRecord,
  updateGrowthRecord,
  deleteGrowthRecord,
} from '../controllers/growth_records.controller.js'

const router = Router()

router.get('/', getGrowthRecords)
router.post('/', createGrowthRecord)
router.patch('/:id', updateGrowthRecord)
router.delete('/:id', deleteGrowthRecord)

export default router
