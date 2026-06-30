import assert from 'node:assert/strict'
import { test } from 'node:test'
import { pool } from '../src/config/db.js'
import {
  checkPetOwnership,
  createRecord,
  findAllRecordsByUserId,
  findRecordsByPetId,
  findRecordById,
  updateRecord,
  deleteRecord,
} from '../src/services/medical_records.service.js'

test('checkPetOwnership 應透過 userId 與 petId 驗證寵物所有權', async (t) => {
  const query = t.mock.method(pool, 'query', async (text, values) => {
    assert.match(text, /SELECT id FROM pets/i)
    assert.match(text, /WHERE id = \$1 AND user_id = \$2/i)
    assert.deepEqual(values, [1, 42])
    return { rows: [{ id: 1 }] }
  })

  const isOwner = await checkPetOwnership(1, 42)
  assert.equal(query.mock.callCount(), 1)
  assert.equal(isOwner, true)
})

test('createRecord 應正確插入醫療紀錄資料並處理圖片陣列', async (t) => {
  const row = { id: 10, pet_id: 1, title: '核心疫苗', image_url: ['http://example.com/cat.jpg'] }
  t.mock.method(pool, 'query', async (text, values) => {
    assert.match(text, /INSERT INTO medical_records/i)
    assert.equal(values[0], 1)
    assert.equal(values[3], '核心疫苗')
    assert.deepEqual(values[8], ['http://example.com/cat.jpg'])
    return { rows: [row] }
  })

  const record = await createRecord({
    pet_id: 1,
    record_type: '疫苗',
    title: '核心疫苗',
    image_url: ['http://example.com/cat.jpg'],
  })
  assert.deepEqual(record, row)
})

test('findAllRecordsByUserId 應透過 JOIN pets 來篩選特定使用者的醫療紀錄', async (t) => {
  const rows = [{ id: 1, pet_id: 1, title: '例行體檢' }]
  t.mock.method(pool, 'query', async (text, values) => {
    assert.match(text, /JOIN pets/i)
    assert.match(text, /user_id = \$1/i)
    assert.deepEqual(values, [42])
    return { rows }
  })

  const records = await findAllRecordsByUserId(42)
  assert.deepEqual(records, rows)
})

test('findRecordsByPetId 應同時篩選 pet_id 與擁建立的 user_id', async (t) => {
  const rows = [{ id: 1, pet_id: 1, title: '例行體檢' }]
  t.mock.method(pool, 'query', async (text, values) => {
    assert.match(text, /pet_id = \$1/i)
    assert.match(text, /user_id = \$2/i)
    assert.deepEqual(values, [1, 42])
    return { rows }
  })

  const records = await findRecordsByPetId(1, 42)
  assert.deepEqual(records, rows)
})

test('findRecordById 應確保查詢單一醫療紀錄時有驗證 user_id', async (t) => {
  const row = { id: 10, pet_id: 1, title: '核心疫苗' }
  t.mock.method(pool, 'query', async (text, values) => {
    assert.match(text, /id = \$1/i)
    assert.match(text, /user_id = \$2/i)
    assert.deepEqual(values, [10, 42])
    return { rows: [row] }
  })

  const record = await findRecordById(10, 42)
  assert.deepEqual(record, row)
})

test('findRecordById 找不到醫療紀錄時應回傳 null', async (t) => {
  t.mock.method(pool, 'query', async () => {
    return { rows: [] }
  })

  const record = await findRecordById(999, 42)
  assert.equal(record, null)
})

test('updateRecord 應能正確針對醫療紀錄 ID 進行更新', async (t) => {
  const row = { id: 10, title: '新標題' }
  t.mock.method(pool, 'query', async (text, values) => {
    assert.match(text, /UPDATE medical_records/i)
    assert.equal(values[0], '新標題')
    assert.equal(values[1], 10)
    return { rows: [row] }
  })

  const updated = await updateRecord(10, { title: '新標題' })
  assert.deepEqual(updated, row)
})

test('updateRecord 當傳入空陣列 image_url 時應能正確保持為空陣列', async (t) => {
  const row = { id: 10, image_url: [] }
  t.mock.method(pool, 'query', async (text, values) => {
    assert.deepEqual(values[0], [])
    assert.equal(values[1], 10)
    return { rows: [row] }
  })

  const updated = await updateRecord(10, { image_url: [] })
  assert.deepEqual(updated, row)
})

test('deleteRecord 應確實執行刪除語法', async (t) => {
  const query = t.mock.method(pool, 'query', async (text, values) => {
    assert.match(text, /DELETE FROM medical_records/i)
    assert.deepEqual(values, [10])
    return { rowCount: 1 }
  })

  const result = await deleteRecord(10)
  assert.equal(query.mock.callCount(), 1)
  assert.equal(result, true)
})
