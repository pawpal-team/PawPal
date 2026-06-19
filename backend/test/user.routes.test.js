import assert from 'node:assert/strict'
import { test } from 'node:test'

import userRoutes from '../src/routes/user.routes.js'

test('registers GET /me route for current user API', () => {
  const route = userRoutes.stack.find((layer) => layer.route?.path === '/me')

  assert.ok(route)
  assert.equal(route.route.methods.get, true)
  assert.equal(route.route.stack.length, 2)
})
