import * as defaultGrowthRecordsService from '../services/growth_records.service.js'

export async function getGrowthRecords(req, res) {
  const service = req.services?.growthRecordsService || defaultGrowthRecordsService
  const userId = 1 // 暫時寫死，待JWT 完成後替換為 req.userId
  const petId = Number(req.query.petId)
  const { metricType } = req.query

  if (!Number.isSafeInteger(petId) || petId <= 0) {
    return res.status(400).json({ message: 'Invalid pet ID' })
  }

  const records = await service.findGrowthRecords(userId, petId, metricType)
  return res.json({ records })
}

export async function createGrowthRecord(req, res) {
  const service = req.services?.growthRecordsService || defaultGrowthRecordsService
  const userId = 1 // 暫時寫死，待JWT 完成後替換為 req.userId
  const { pet_id, metric_type, value, unit, recorded_at, notes } = req.body
  const petId = Number(pet_id)

  if (!Number.isSafeInteger(petId) || petId <= 0) {
    return res.status(400).json({ message: 'Invalid pet ID' })
  }

  if (!metric_type || value === undefined || !unit || !recorded_at) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  const record = await service.createGrowthRecord({
    userId,
    petId,
    metricType: metric_type,
    value,
    unit,
    recordedAt: recorded_at,
    notes,
  })

  if (!record) {
    return res.status(403).json({ message: 'Pet not found or access denied' })
  }

  return res.status(201).json({ record })
}

export async function updateGrowthRecord(req, res) {
  const service = req.services?.growthRecordsService || defaultGrowthRecordsService
  const userId = 1 // 暫時寫死，待JWT 完成後替換為 req.userId
  const id = Number(req.params.id)

  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({ message: 'Invalid ID' })
  }

  const { value, unit, recorded_at, notes } = req.body

  if (value === undefined || !unit || !recorded_at) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  const record = await service.updateGrowthRecord(userId, id, {
    value,
    unit,
    recordedAt: recorded_at,
    notes,
  })

  if (!record) {
    return res.status(404).json({ message: 'Record not found' })
  }

  return res.json({ record })
}

export async function deleteGrowthRecord(req, res) {
  const service = req.services?.growthRecordsService || defaultGrowthRecordsService
  const userId = 1 // 暫時寫死，待JWT 完成後替換為 req.userId
  const id = Number(req.params.id)

  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({ message: 'Invalid ID' })
  }

  const deleted = await service.deleteGrowthRecord(userId, id)

  if (!deleted) {
    return res.status(404).json({ message: 'Record not found' })
  }

  return res.status(204).send()
}
