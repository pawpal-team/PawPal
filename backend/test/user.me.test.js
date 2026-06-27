import assert from 'node:assert/strict'
import { test } from 'node:test'

import * as userController from '../src/controllers/user.controller.js'

function createTestController(findUserById) {
  assert.equal(typeof userController.createGetCurrentUser, 'function')

  return userController.createGetCurrentUser({ findUserById })
}

test('應回傳目前使用者資料，且不暴露密碼', async () => {
  const user = {
    id: 1,
    email: 'alice@example.com',
    name: 'Alice Chen',
    avatar_url: null,
    created_at: new Date('2026-06-18T00:00:00Z'),
  }
  const getCurrentUser = createTestController(async (id) => {
    assert.equal(id, 1)
    return user
  })
  const req = { userId: 1 }
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

test('目前使用者不存在時應回傳 404', async () => {
  const getCurrentUser = createTestController(async () => null)
  const req = { userId: 999 }
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
  assert.deepEqual(res.body, { message: '找不到使用者' })
})

test('取得目前使用者資料失敗時應回傳 500', async (t) => {
  t.mock.method(console, 'error', () => {})

  const getCurrentUser = createTestController(async () => {
    throw new Error('Database unavailable')
  })
  const req = { userId: 1 }
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
  assert.deepEqual(res.body, { message: '取得使用者資料失敗' })
})
