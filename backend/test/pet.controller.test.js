import assert from 'node:assert/strict'
import { test } from 'node:test'

import { createPetController } from '../src/controllers/pet.controller.js'

test('應匯出可注入相依服務的寵物 controller factory', () => {
  assert.equal(typeof createPetController, 'function')
})

function createTestController(overrides = {}) {
  const notImplemented = async () => {
    throw new Error('service method should not be called')
  }

  return createPetController({
    findPetsByUserId: notImplemented,
    findPetByIdAndUserId: notImplemented,
    createPetForUser: notImplemented,
    updatePetByIdAndUserId: notImplemented,
    deletePetByIdAndUserId: notImplemented,
    ...overrides,
  })
}

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

test('應列出已驗證使用者的寵物', async () => {
  const pets = [{ id: 1, user_id: 42, name: 'Momo', species: 'Dog' }]
  const { listPets } = createTestController({
    findPetsByUserId: async (userId) => {
      assert.equal(userId, 42)
      return pets
    },
  })
  const req = { userId: 42 }
  const res = createResponse()

  await listPets(req, res)

  assert.equal(res.statusCode, 200)
  assert.deepEqual(res.body, { pets })
})

test('應依 ID 取得已驗證使用者的單一寵物', async () => {
  const pet = { id: 2, user_id: 42, name: 'Luna', species: 'Cat' }
  const { getPet } = createTestController({
    findPetByIdAndUserId: async (id, userId) => {
      assert.equal(id, 2)
      assert.equal(userId, 42)
      return pet
    },
  })
  const req = {
    userId: 42,
    params: { id: '2' },
  }
  const res = createResponse()

  await getPet(req, res)

  assert.equal(res.statusCode, 200)
  assert.deepEqual(res.body, { pet })
})

test('寵物不屬於已驗證使用者時應回傳 404', async () => {
  const { getPet } = createTestController({
    findPetByIdAndUserId: async () => null,
  })
  const req = {
    userId: 42,
    params: { id: '99' },
  }
  const res = createResponse()

  await getPet(req, res)

  assert.equal(res.statusCode, 404)
  assert.deepEqual(res.body, { message: 'Pet not found' })
})

test('應為已驗證使用者建立寵物', async () => {
  const createdPet = { id: 3, user_id: 42, name: 'Oreo', species: 'Dog' }
  const { createPet } = createTestController({
    createPetForUser: async (userId, petData) => {
      assert.equal(userId, 42)
      assert.deepEqual(petData, {
        name: 'Oreo',
        species: 'Dog',
        breed: 'Border Collie',
        neutered: false,
      })
      return createdPet
    },
  })
  const req = {
    userId: 42,
    body: {
      name: 'Oreo',
      species: 'Dog',
      breed: 'Border Collie',
      neutered: false,
    },
  }
  const res = createResponse()

  await createPet(req, res)

  assert.equal(res.statusCode, 201)
  assert.deepEqual(res.body, { pet: createdPet })
})

test('應更新已驗證使用者擁有的寵物', async () => {
  const updatedPet = { id: 4, user_id: 42, name: 'Nana', species: 'Rabbit', weight: '1.90' }
  const { updatePet } = createTestController({
    updatePetByIdAndUserId: async (id, userId, petData) => {
      assert.equal(id, 4)
      assert.equal(userId, 42)
      assert.deepEqual(petData, { weight: 1.9 })
      return updatedPet
    },
  })
  const req = {
    userId: 42,
    params: { id: '4' },
    body: { weight: 1.9 },
  }
  const res = createResponse()

  await updatePet(req, res)

  assert.equal(res.statusCode, 200)
  assert.deepEqual(res.body, { pet: updatedPet })
})

test('應刪除已驗證使用者擁有的寵物', async () => {
  const { deletePet } = createTestController({
    deletePetByIdAndUserId: async (id, userId) => {
      assert.equal(id, 5)
      assert.equal(userId, 42)
      return true
    },
  })
  const req = {
    userId: 42,
    params: { id: '5' },
  }
  const res = createResponse()

  await deletePet(req, res)

  assert.equal(res.statusCode, 204)
  assert.equal(res.sent, true)
})
