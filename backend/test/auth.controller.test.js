import assert from 'node:assert/strict'
import { test } from 'node:test'

import * as authController from '../src/controllers/auth.controller.js'

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

test('Email 已被註冊時應回傳中文錯誤訊息', async () => {
  assert.equal(typeof authController.createRegister, 'function')

  const register = authController.createRegister({
    findUserByEmail: async () => ({ id: 1 }),
    createUser: async () => {
      throw new Error('createUser should not be called')
    },
  })
  const req = {
    body: {
      name: '小白',
      email: 'user@example.com',
      password: 'password123',
    },
  }
  const res = createResponse()

  await register(req, res)

  assert.equal(res.statusCode, 409)
  assert.deepEqual(res.body, { message: '此 Email 已被註冊' })
})

test('登入帳密錯誤時應回傳中文錯誤訊息', async () => {
  assert.equal(typeof authController.createLogin, 'function')

  const login = authController.createLogin({
    findUserByEmail: async () => null,
  })
  const req = {
    body: {
      email: 'user@example.com',
      password: 'wrong-password',
    },
  }
  const res = createResponse()

  await login(req, res)

  assert.equal(res.statusCode, 401)
  assert.deepEqual(res.body, { message: '帳號或密碼錯誤' })
})
