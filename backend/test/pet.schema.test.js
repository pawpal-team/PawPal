import assert from 'node:assert/strict'
import { test } from 'node:test'

import { createPetSchema, updatePetSchema } from '../src/schemas/pet_schema.js'

test('建立寵物 schema 應修剪可寫入字串欄位', () => {
  const result = createPetSchema.safeParse({
    name: ' Oreo ',
    species: ' Dog ',
    breed: ' Border Collie ',
    ignored: 'value',
    neutered: false,
  })

  assert.equal(result.success, true)
  assert.deepEqual(result.data, {
    name: 'Oreo',
    species: 'Dog',
    breed: 'Border Collie',
    neutered: false,
  })
})

test('建立寵物 schema 應要求 name 與 species', () => {
  const result = createPetSchema.safeParse({ name: 'Momo' })

  assert.equal(result.success, false)
  assert.equal(result.error.issues[0]?.message, '寵物名稱與物種為必填欄位')
})

test('更新寵物 schema 應拒絕只包含未知欄位的空更新', () => {
  const result = updatePetSchema.safeParse({ ignored: 'value' })

  assert.equal(result.success, false)
  assert.equal(result.error.issues[0]?.message, '請至少提供一個寵物欄位')
})

test('更新寵物 schema 應拒絕空白的寵物名稱', () => {
  const result = updatePetSchema.safeParse({ name: '   ' })

  assert.equal(result.success, false)
  assert.equal(result.error.issues[0]?.message, '寵物名稱不可為空白')
})
