import assert from 'node:assert/strict'
import { test } from 'node:test'

import { pool } from '../src/config/db.js'
import {
  createPetForUser,
  deletePetByIdAndUserId,
  findPetByIdAndUserId,
  findPetsByUserId,
  updatePetByIdAndUserId,
} from '../src/services/pet.service.js'

test('findPetsByUserId selects only pets owned by the user', async (t) => {
  const rows = [{ id: 1, user_id: 1, name: 'Momo' }]
  const query = t.mock.method(pool, 'query', async (text, values) => {
    assert.match(text, /WHERE user_id = \$1/)
    assert.deepEqual(values, [1])
    return { rows }
  })

  const pets = await findPetsByUserId(1)

  assert.equal(query.mock.callCount(), 1)
  assert.deepEqual(pets, rows)
})

test('findPetByIdAndUserId requires both pet id and user id', async (t) => {
  const row = { id: 2, user_id: 1, name: 'Luna' }
  t.mock.method(pool, 'query', async (text, values) => {
    assert.match(text, /WHERE id = \$1/)
    assert.match(text, /AND user_id = \$2/)
    assert.deepEqual(values, [2, 1])
    return { rows: [row] }
  })

  const pet = await findPetByIdAndUserId(2, 1)

  assert.deepEqual(pet, row)
})

test('createPetForUser inserts user_id from the current user', async (t) => {
  const row = { id: 3, user_id: 1, name: 'Oreo', species: 'Dog' }
  t.mock.method(pool, 'query', async (text, values) => {
    assert.match(text, /INSERT INTO pets/)
    assert.match(text, /user_id/)
    assert.match(text, /notes/)
    assert.match(text, /avatar_url/)
    assert.equal(values[0], 1)
    assert.equal(values[1], 'Oreo')
    assert.equal(values[2], 'Dog')
    return { rows: [row] }
  })

  const pet = await createPetForUser(1, {
    name: 'Oreo',
    species: 'Dog',
  })

  assert.deepEqual(pet, row)
})

test('updatePetByIdAndUserId updates only pets owned by the user', async (t) => {
  const row = { id: 4, user_id: 1, name: 'Nana', species: 'Rabbit', weight: '1.90' }
  t.mock.method(pool, 'query', async (text, values) => {
    assert.match(text, /UPDATE pets/)
    assert.match(text, /notes = \$1/)
    assert.match(text, /WHERE id = \$2 AND user_id = \$3/)
    assert.deepEqual(values, ['updated note', 4, 1])
    return { rows: [row] }
  })

  const pet = await updatePetByIdAndUserId(4, 1, { notes: 'updated note' })

  assert.deepEqual(pet, row)
})

test('deletePetByIdAndUserId deletes only pets owned by the user', async (t) => {
  t.mock.method(pool, 'query', async (text, values) => {
    assert.match(text, /DELETE FROM pets/)
    assert.match(text, /WHERE id = \$1 AND user_id = \$2/)
    assert.deepEqual(values, [5, 1])
    return { rowCount: 1 }
  })

  const deleted = await deletePetByIdAndUserId(5, 1)

  assert.equal(deleted, true)
})
