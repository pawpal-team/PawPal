import assert from 'node:assert/strict'
import { test } from 'node:test'

import {
  getGrowthRecords,
  createGrowthRecord,
  updateGrowthRecord,
  deleteGrowthRecord,
} from '../src/controllers/growth_records.controller.js'

function createResponse() {
  return {
    statusCode: null,
    body: null,
    sent: false,
    status(code) {
      this.statusCode = code
      return this
    },
    json(payload) {
      this.body = payload
      return this
    },
    send(payload) {
      this.body = payload
      this.sent = true
      return this
    },
  }
}

test('取得指定寵物的成長紀錄', async () => {
  const records = [{ id: 1, pet_id: 1, metric_type: 'weight', value: '8.20', unit: 'kg' }]
  const req = {
    query: { petId: '1' },
    services: {
      growthRecordsService: {
        findGrowthRecords: async (userId, petId, metricType) => {
          assert.equal(petId, 1)
          return records
        },
      },
    },
  }
  const res = createResponse()

  await getGrowthRecords(req, res)

  assert.equal(res.statusCode, null)
  assert.deepEqual(res.body, { records })
})

test('petId 無效時回傳 400', async () => {
  const req = {
    query: { petId: 'abc' },
    services: {
      growthRecordsService: {
        findGrowthRecords: async () => {
          throw new Error('service should not be called')
        },
      },
    },
  }
  const res = createResponse()

  await getGrowthRecords(req, res)

  assert.equal(res.statusCode, 400)
  assert.deepEqual(res.body, { message: 'Invalid pet ID' })
})

test('新增成長紀錄成功回傳 201', async () => {
  const record = { id: 1, pet_id: 1, metric_type: 'weight', value: '8.20', unit: 'kg' }
  const req = {
    body: {
      pet_id: 1,
      metric_type: 'weight',
      value: 8.2,
      unit: 'kg',
      recorded_at: '2026-06-25 10:00:00',
    },
    services: {
      growthRecordsService: {
        createGrowthRecord: async (data) => {
          assert.equal(data.petId, 1)
          assert.equal(data.metricType, 'weight')
          return record
        },
      },
    },
  }
  const res = createResponse()

  await createGrowthRecord(req, res)

  assert.equal(res.statusCode, 201)
  assert.deepEqual(res.body, { record })
})

test('新增缺少必填欄位回傳 400', async () => {
  const req = {
    body: { pet_id: 1, metric_type: 'weight' },
    services: {
      growthRecordsService: {
        createGrowthRecord: async () => {
          throw new Error('service should not be called')
        },
      },
    },
  }
  const res = createResponse()

  await createGrowthRecord(req, res)

  assert.equal(res.statusCode, 400)
  assert.deepEqual(res.body, { message: 'Missing required fields' })
})

test('新增時寵物不存在或無權限回傳 403', async () => {
  const req = {
    body: {
      pet_id: 99,
      metric_type: 'weight',
      value: 8.2,
      unit: 'kg',
      recorded_at: '2026-06-25 10:00:00',
    },
    services: {
      growthRecordsService: {
        createGrowthRecord: async () => null,
      },
    },
  }
  const res = createResponse()

  await createGrowthRecord(req, res)

  assert.equal(res.statusCode, 403)
  assert.deepEqual(res.body, { message: 'Pet not found or access denied' })
})

test('更新成長紀錄成功', async () => {
  const record = { id: 1, pet_id: 1, metric_type: 'weight', value: '9.00', unit: 'kg' }
  const req = {
    params: { id: '1' },
    body: { value: 9.0, unit: 'kg', recorded_at: '2026-06-25 10:00:00' },
    services: {
      growthRecordsService: {
        updateGrowthRecord: async (userId, id, data) => {
          assert.equal(id, 1)
          return record
        },
      },
    },
  }
  const res = createResponse()

  await updateGrowthRecord(req, res)

  assert.equal(res.statusCode, null)
  assert.deepEqual(res.body, { record })
})

test('更新找不到紀錄回傳 404', async () => {
  const req = {
    params: { id: '999' },
    body: { value: 9.0, unit: 'kg', recorded_at: '2026-06-25 10:00:00' },
    services: {
      growthRecordsService: {
        updateGrowthRecord: async () => null,
      },
    },
  }
  const res = createResponse()

  await updateGrowthRecord(req, res)

  assert.equal(res.statusCode, 404)
  assert.deepEqual(res.body, { message: 'Record not found' })
})

test('刪除成長紀錄成功回傳 204', async () => {
  const req = {
    params: { id: '1' },
    services: {
      growthRecordsService: {
        deleteGrowthRecord: async (userId, id) => {
          assert.equal(id, 1)
          return { id: 1 }
        },
      },
    },
  }
  const res = createResponse()

  await deleteGrowthRecord(req, res)

  assert.equal(res.statusCode, 204)
  assert.equal(res.sent, true)
})

test('刪除找不到紀錄回傳 404', async () => {
  const req = {
    params: { id: '999' },
    services: {
      growthRecordsService: {
        deleteGrowthRecord: async () => null,
      },
    },
  }
  const res = createResponse()

  await deleteGrowthRecord(req, res)

  assert.equal(res.statusCode, 404)
  assert.deepEqual(res.body, { message: 'Record not found' })
})
