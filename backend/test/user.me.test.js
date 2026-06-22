import assert from 'node:assert/strict'
import { test } from 'node:test'

import { getCurrentUser } from '../src/controllers/user.controller.js'

test('returns the current user without exposing password', async () => {
  const user = {
    id: 1,
    email: 'alice@example.com',
    name: 'Alice Chen',
    avatar_url: null,
    created_at: new Date('2026-06-18T00:00:00Z'),
  }
  const req = {
    userId: 1,
    services: {
      userService: {
        findUserById: async (id) => {
          assert.equal(id, 1)
          return user
        },
      },
    },
  }
  const res = {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code
      return this
    },
    json(payload) {
      this.body = payload
      return this
    },
  }

  await getCurrentUser(req, res)

  assert.equal(res.statusCode, 200)
  assert.deepEqual(res.body, { user })
  assert.equal(Object.hasOwn(res.body.user, 'password'), false)
})

test('returns 404 when the current user does not exist', async () => {
  const req = {
    userId: 999,
    services: {
      userService: {
        findUserById: async () => null,
      },
    },
  }
  const res = {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code
      return this
    },
    json(payload) {
      this.body = payload
      return this
    },
  }

  await getCurrentUser(req, res)

  assert.equal(res.statusCode, 404)
  assert.deepEqual(res.body, { message: 'User not found' })
})

test('returns 500 when fetching the current user fails', async (t) => {
  t.mock.method(console, 'error', () => {})

  const req = {
    userId: 1,
    services: {
      userService: {
        findUserById: async () => {
          throw new Error('Database unavailable')
        },
      },
    },
  }
  const res = {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code
      return this
    },
    json(payload) {
      this.body = payload
      return this
    },
  }

  await getCurrentUser(req, res)

  assert.equal(res.statusCode, 500)
  assert.deepEqual(res.body, { message: 'Failed to get current user' })
})
