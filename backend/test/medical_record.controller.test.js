import assert from 'node:assert/strict'
import { test } from 'node:test'

import {
  addRecord,
  deleteRecord,
  getAllRecords,
  getPetRecords,
  getSingleRecord,
  updateRecord,
} from '../src/controllers/medical_record.controller.js'

function createMockResponse() {
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

function createMockZodError(message) {
  const err = new Error(message)
  err.name = 'ZodError'
  err.errors = [{ message }]
  return err
}

test('列出目前使用者的所有醫療紀錄', async () => {
  const records = [{ id: 1, pet_id: 1, title: '例行體檢' }]
  const req = {
    userId: 1,
    services: {
      medicalService: {
        findAllRecordsByUserId: async (userId) => {
          assert.equal(userId, 1)
          return records
        },
      },
    },
  }
  const res = createMockResponse()

  await getAllRecords(req, res)

  assert.equal(res.statusCode, 200)
  assert.deepEqual(res.body, { data: records })
})

test('列出指定寵物的醫療紀錄', async () => {
  const records = [{ id: 1, pet_id: 1, title: '例行體檢' }]
  const req = {
    userId: 1,
    params: { petId: '1' },
    services: {
      medicalService: {
        checkPetOwnership: async (petId, userId) => {
          assert.equal(petId, 1)
          assert.equal(userId, 1)
          return true
        },
        findRecordsByPetId: async (petId, userId) => {
          assert.equal(petId, 1)
          assert.equal(userId, 1)
          return records
        },
      },
    },
  }
  const res = createMockResponse()

  await getPetRecords(req, res)

  assert.equal(res.statusCode, 200)
  assert.deepEqual(res.body, { data: records })
})

test('當醫療紀錄不屬於目前使用者時應回傳 404', async () => {
  const req = {
    userId: 1,
    params: { id: '99' },
    services: {
      medicalService: {
        findRecordById: async () => null,
      },
    },
  }
  const res = createMockResponse()

  await getSingleRecord(req, res)

  assert.equal(res.statusCode, 404)
  assert.deepEqual(res.body, { message: '找不到該筆醫療紀錄' })
})

test('應成功為目前登入會員擁建立寵物醫療紀錄', async () => {
  const createdRecord = { id: 10, pet_id: 1, title: '年度核心疫苗施打' }
  const req = {
    userId: 1,
    body: {
      pet_id: 1,
      record_type: '疫苗',
      title: '年度核心疫苗施打',
      record_date: '2026-06-24',
    },
    services: {
      medicalService: {
        checkPetOwnership: async (petId, userId) => {
          assert.equal(petId, 1)
          assert.equal(userId, 1)
          return true
        },
        createRecord: async (recordData) => {
          assert.equal(recordData.pet_id, 1)
          assert.equal(recordData.title, '年度核心疫苗施打')
          return createdRecord
        },
      },
    },
  }
  const res = createMockResponse()

  await addRecord(req, res)

  assert.equal(res.statusCode, 201)
  assert.deepEqual(res.body, {
    message: '新增醫療紀錄成功',
    data: createdRecord,
  })
})

test('少填必填欄位時應拒絕建立醫療紀錄並回傳 400', async () => {
  const req = {
    userId: 1,
    body: { title: '年度核心疫苗施打' },
    services: {
      medicalService: {
        checkPetOwnership: async () => {
          throw createMockZodError('請選擇寵物')
        },
      },
    },
  }
  const res = createMockResponse()

  await addRecord(req, res)

  assert.equal(res.statusCode, 400)
  assert.deepEqual(res.body, { message: '請選擇寵物' })
})

test('當新增醫療紀錄時，若寵物不屬於該使用者應回傳 404', async () => {
  const req = {
    userId: 1,
    body: {
      pet_id: 999,
      record_type: '看診',
      title: '看診紀錄',
      record_date: '2026-06-24',
    },
    services: {
      medicalService: {
        checkPetOwnership: async () => false,
      },
    },
  }
  const res = createMockResponse()

  await addRecord(req, res)

  assert.equal(res.statusCode, 404)
  assert.deepEqual(res.body, { message: '找不到該寵物資訊' })
})

test('應成功修改目前使用者寵物的醫療紀錄', async () => {
  const updatedRecord = { id: 10, pet_id: 1, title: '新標題' }
  const req = {
    userId: 1,
    params: { id: '10' },
    body: { title: '新標題' },
    services: {
      medicalService: {
        findRecordById: async (id, userId) => {
          assert.equal(id, 10)
          assert.equal(userId, 1)
          return { id: 10, pet_id: 1 }
        },
        updateRecord: async (id, updateData) => {
          assert.equal(id, 10)
          assert.deepEqual(updateData, { title: '新標題' })
          return updatedRecord
        },
      },
    },
  }
  const res = createMockResponse()

  await updateRecord(req, res)

  assert.equal(res.statusCode, 200)
  assert.deepEqual(res.body, {
    message: '更新醫療紀錄成功',
    data: updatedRecord,
  })
})

test('修改醫療紀錄時，若標題為空白應拒絕更新並回傳 400', async () => {
  const req = {
    userId: 1,
    params: { id: '10' },
    body: { title: '   ' },
    services: {
      medicalService: {
        findRecordById: async () => {
          return { id: 10, pet_id: 1 }
        },
        updateRecord: async () => {
          throw createMockZodError('標題不能為空白')
        },
      },
    },
  }
  const res = createMockResponse()

  await updateRecord(req, res)

  assert.equal(res.statusCode, 400)
  assert.deepEqual(res.body, { message: '標題不能為空白' })
})

test('應成功刪除目前使用者寵物的醫療紀錄', async () => {
  const req = {
    userId: 1,
    params: { id: '10' },
    services: {
      medicalService: {
        findRecordById: async (id, userId) => {
          assert.equal(id, 10)
          assert.equal(userId, 1)
          return { id: 10, pet_id: 1 }
        },
        deleteRecord: async (id) => {
          assert.equal(id, 10)
          return true
        },
      },
    },
  }
  const res = createMockResponse()

  await deleteRecord(req, res)

  assert.equal(res.statusCode, 200)
  assert.deepEqual(res.body, { message: '刪除醫療紀錄成功' })
})
