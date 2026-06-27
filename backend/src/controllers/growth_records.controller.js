import * as defaultGrowthRecordsService from '../services/growth_records.service.js'
import { METRIC_TYPES } from '../schemas/growth_record_schema.js'

export async function getGrowthRecords(req, res) {
  const service = req.services?.growthRecordsService || defaultGrowthRecordsService
  const userId = req.userId
  const petId = Number(req.query.petId)
  const { metricType } = req.query

  if (!Number.isSafeInteger(petId) || petId <= 0) {
    return res.status(400).json({ message: '請提供有效的寵物 ID' })
  }

  if (metricType && !METRIC_TYPES.includes(metricType)) {
    return res.status(400).json({ message: '不支援此量測類型' })
  }

  const records = await service.findGrowthRecords(userId, petId, metricType)
  return res.json({ records })
}

export async function createGrowthRecord(req, res) {
  const service = req.services?.growthRecordsService || defaultGrowthRecordsService
  const userId = req.userId
  const { pet_id, metric_type, value, unit, recorded_at, notes } = req.body

  const record = await service.createGrowthRecord({
    userId,
    petId: pet_id,
    metricType: metric_type,
    value,
    unit,
    recordedAt: recorded_at,
    notes,
  })

  if (!record) {
    return res.status(403).json({ message: '找不到此寵物，或你沒有權限新增紀錄' })
  }

  return res.status(201).json({ record })
}

export async function updateGrowthRecord(req, res) {
  const service = req.services?.growthRecordsService || defaultGrowthRecordsService
  const userId = req.userId
  const id = Number(req.params.id)

  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({ message: '請提供有效的紀錄 ID' })
  }

  const { value, unit, recorded_at, notes } = req.body

  const record = await service.updateGrowthRecord(userId, id, {
    value,
    unit,
    recordedAt: recorded_at,
    notes,
  })

  if (!record) {
    return res.status(404).json({ message: '找不到此成長紀錄' })
  }

  return res.json({ record })
}

export async function deleteGrowthRecord(req, res) {
  const service = req.services?.growthRecordsService || defaultGrowthRecordsService
  const userId = req.userId
  const id = Number(req.params.id)

  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({ message: '請提供有效的紀錄 ID' })
  }

  const deleted = await service.deleteGrowthRecord(userId, id)

  if (!deleted) {
    return res.status(404).json({ message: '找不到此成長紀錄' })
  }

  return res.status(204).send()
}
