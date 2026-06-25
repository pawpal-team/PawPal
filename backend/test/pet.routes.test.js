import assert from 'node:assert/strict'
import { test } from 'node:test'

import app from '../src/app.js'
import { authenticateToken } from '../src/middlewares/auth.middleware.js'
import petRoutes from '../src/routes/pet.routes.js'

test('protects every pets CRUD route with JWT authentication', () => {
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
      { path: '/:id', methods: ['put'] },
      { path: '/:id', methods: ['delete'] },
    ],
  )

  routes.forEach(({ middleware }) => {
    assert.equal(middleware.length, 2)
    assert.equal(middleware[0].handle, authenticateToken)
  })
})

test('mounts pets routes under /api/pets', () => {
  const hasPetsRouter = app.router.stack.some((layer) => layer.handle === petRoutes)

  assert.equal(hasPetsRouter, true)
})
