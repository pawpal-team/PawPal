import assert from 'node:assert/strict'
import { test } from 'node:test'

import userRoutes from '../src/routes/users.route.js'

test('應註冊取得目前使用者資料的 GET /me 路由', () => {
  const route = userRoutes.stack.find((layer) => layer.route?.path === '/me')

  assert.ok(route)
  assert.equal(route.route.methods.get, true)
  assert.equal(route.route.stack.length, 2)
})
