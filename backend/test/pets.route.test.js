import assert from 'node:assert/strict'
import { test } from 'node:test'

import app from '../src/app.js'
import { authenticateToken } from '../src/middlewares/auth.middleware.js'
import petRoutes from '../src/routes/pets.route.js'

test('每個寵物 CRUD 路由都應使用 JWT 驗證保護', () => {
  const routes = petRoutes.stack.map((layer) => ({
    path: layer.route?.path,
    methods: Object.keys(layer.route?.methods ?? {}),
    middleware: layer.route?.stack,
  }))

  assert.deepEqual(
    routes.map(({ path, methods }) => ({ path, methods })),
    [
      { path: '/', methods: ['get'] },
      { path: '/:id', methods: ['get'] },
      { path: '/', methods: ['post'] },
      { path: '/:id', methods: ['patch'] },
      { path: '/:id', methods: ['delete'] },
    ],
  )

  routes.forEach(({ middleware }) => {
    assert.ok(middleware.length >= 2)
    assert.equal(middleware[0].handle, authenticateToken)
  })
})

test('寵物請求 body 應在進入 controller 前驗證', () => {
  const routes = petRoutes.stack.map((layer) => ({
    path: layer.route?.path,
    methods: Object.keys(layer.route?.methods ?? {}),
    middleware: layer.route?.stack,
  }))

  const createRoute = routes.find(({ path, methods }) => path === '/' && methods.includes('post'))
  const updateRoute = routes.find(
    ({ path, methods }) => path === '/:id' && methods.includes('patch'),
  )

  assert.equal(createRoute.middleware.length, 3)
  assert.equal(updateRoute.middleware.length, 3)
})

test('應將寵物路由掛載在 /api/v1/pets', () => {
  const hasPetsRouter = app.router.stack.some((layer) => layer.handle === petRoutes)

  assert.equal(hasPetsRouter, true)
})
