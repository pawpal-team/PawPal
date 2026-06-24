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

test('缺少 Authorization token 時應拒絕請求', () => {
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

test('JWT token 無效時應拒絕請求', () => {
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

test('JWT token 有效時應儲存使用者 ID 並繼續處理請求', () => {
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

test('JWT 的 sub 欄位不是正整數時應拒絕請求', () => {
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

test('未設定 JWT_SECRET 時應拒絕 token', () => {
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
