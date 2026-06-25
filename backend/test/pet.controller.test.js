import assert from 'node:assert/strict'
import { test } from 'node:test'

import {
  createPet,
  deletePet,
  getPet,
  listPets,
  updatePet,
} from '../src/controllers/pet.controller.js'

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

test('lists pets for the authenticated user', async () => {
  const pets = [{ id: 1, user_id: 42, name: 'Momo', species: 'Dog' }]
  const req = {
    userId: 42,
    services: {
      petService: {
        findPetsByUserId: async (userId) => {
          assert.equal(userId, 42)
          return pets
        },
      },
    },
  }
  const res = createResponse()

  await listPets(req, res)

  assert.equal(res.statusCode, 200)
  assert.deepEqual(res.body, { pets })
})

test('gets one pet by id for the authenticated user', async () => {
  const pet = { id: 2, user_id: 42, name: 'Luna', species: 'Cat' }
  const req = {
    userId: 42,
    params: { id: '2' },
    services: {
      petService: {
        findPetByIdAndUserId: async (id, userId) => {
          assert.equal(id, 2)
          assert.equal(userId, 42)
          return pet
        },
      },
    },
  }
  const res = createResponse()

  await getPet(req, res)

  assert.equal(res.statusCode, 200)
  assert.deepEqual(res.body, { pet })
})

test('returns 404 when the pet does not belong to the authenticated user', async () => {
  const req = {
    userId: 42,
    params: { id: '99' },
    services: {
      petService: {
        findPetByIdAndUserId: async () => null,
      },
    },
  }
  const res = createResponse()

  await getPet(req, res)

  assert.equal(res.statusCode, 404)
  assert.deepEqual(res.body, { message: 'Pet not found' })
})

test('creates a pet for the authenticated user', async () => {
  const createdPet = { id: 3, user_id: 42, name: 'Oreo', species: 'Dog' }
  const req = {
    userId: 42,
    body: {
      name: ' Oreo ',
      species: ' Dog ',
      breed: 'Border Collie',
      neutered: false,
    },
    services: {
      petService: {
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
      },
    },
  }
  const res = createResponse()

  await createPet(req, res)

  assert.equal(res.statusCode, 201)
  assert.deepEqual(res.body, { pet: createdPet })
})

test('rejects creating a pet without required fields', async () => {
  const req = {
    userId: 42,
    body: { name: 'Momo' },
    services: {
      petService: {
        createPetForUser: async () => {
          throw new Error('service should not be called')
        },
      },
    },
  }
  const res = createResponse()

  await createPet(req, res)

  assert.equal(res.statusCode, 400)
  assert.deepEqual(res.body, { message: 'name and species are required' })
})

test('updates a pet owned by the authenticated user', async () => {
  const updatedPet = { id: 4, user_id: 42, name: 'Nana', species: 'Rabbit', weight: '1.90' }
  const req = {
    userId: 42,
    params: { id: '4' },
    body: { weight: 1.9 },
    services: {
      petService: {
        updatePetByIdAndUserId: async (id, userId, petData) => {
          assert.equal(id, 4)
          assert.equal(userId, 42)
          assert.deepEqual(petData, { weight: 1.9 })
          return updatedPet
        },
      },
    },
  }
  const res = createResponse()

  await updatePet(req, res)

  assert.equal(res.statusCode, 200)
  assert.deepEqual(res.body, { pet: updatedPet })
})

test('deletes a pet owned by the authenticated user', async () => {
  const req = {
    userId: 42,
    params: { id: '5' },
    services: {
      petService: {
        deletePetByIdAndUserId: async (id, userId) => {
          assert.equal(id, 5)
          assert.equal(userId, 42)
          return true
        },
      },
    },
  }
  const res = createResponse()

  await deletePet(req, res)

  assert.equal(res.statusCode, 204)
  assert.equal(res.sent, true)
})
