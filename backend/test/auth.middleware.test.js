import assert from 'node:assert/strict'
import { test } from 'node:test'

import { authenticateToken } from '../src/middleware/auth.middleware.js'
import { signJwt } from '../src/utils/jwt.js'

function createResponse() {
  return {
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
}

test('rejects requests without an Authorization token', () => {
  const req = { headers: {} }
  const res = createResponse()
  let nextCalled = false

  authenticateToken(req, res, () => {
    nextCalled = true
  })

  assert.equal(res.statusCode, 401)
  assert.deepEqual(res.body, { message: 'Unauthorized' })
  assert.equal(nextCalled, false)
})

test('rejects invalid JWT tokens', () => {
  const req = { headers: { authorization: 'Bearer invalid-token' } }
  const res = createResponse()
  let nextCalled = false

  authenticateToken(req, res, () => {
    nextCalled = true
  })

  assert.equal(res.statusCode, 401)
  assert.deepEqual(res.body, { message: 'Unauthorized' })
  assert.equal(nextCalled, false)
})

test('stores user id and continues when JWT token is valid', () => {
  const token = signJwt({ userId: 42 }, process.env.JWT_SECRET || 'test-secret')
  const req = { headers: { authorization: `Bearer ${token}` } }
  const res = createResponse()
  let nextCalled = false

  authenticateToken(req, res, () => {
    nextCalled = true
  })

  assert.equal(req.userId, 42)
  assert.equal(res.statusCode, 200)
  assert.equal(nextCalled, true)
})
