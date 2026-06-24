import assert from 'node:assert/strict'
import { test } from 'node:test'
import jwt from 'jsonwebtoken'

import { authenticateToken } from '../src/middlewares/auth.middleware.js'

const JWT_SECRET = 'middleware-test-secret'

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
  process.env.JWT_SECRET = JWT_SECRET
  const token = jwt.sign({ sub: 42 }, JWT_SECRET)
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

test('rejects a valid JWT without a positive integer sub claim', () => {
  process.env.JWT_SECRET = JWT_SECRET
  const token = jwt.sign({ sub: 'not-a-user-id' }, JWT_SECRET)
  const req = { headers: { authorization: `Bearer ${token}` } }
  const res = createResponse()
  let nextCalled = false

  authenticateToken(req, res, () => {
    nextCalled = true
  })

  assert.equal(res.statusCode, 401)
  assert.deepEqual(res.body, { message: 'Unauthorized' })
  assert.equal(nextCalled, false)
})

test('rejects tokens when JWT_SECRET is not configured', () => {
  delete process.env.JWT_SECRET
  const token = jwt.sign({ sub: 42 }, 'test-secret')
  const req = { headers: { authorization: `Bearer ${token}` } }
  const res = createResponse()
  let nextCalled = false

  authenticateToken(req, res, () => {
    nextCalled = true
  })

  assert.equal(res.statusCode, 401)
  assert.deepEqual(res.body, { message: 'Unauthorized' })
  assert.equal(nextCalled, false)
})
