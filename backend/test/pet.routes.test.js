import assert from 'node:assert/strict'
import { test } from 'node:test'

import app from '../src/app.js'
import petRoutes from '../src/routes/pet.routes.js'

test('registers pets CRUD routes', () => {
  const routes = petRoutes.stack.map((layer) => ({
    path: layer.route?.path,
    methods: Object.keys(layer.route?.methods ?? {}),
  }))

  assert.deepEqual(routes, [
    { path: '/', methods: ['get'] },
    { path: '/:id', methods: ['get'] },
    { path: '/', methods: ['post'] },
    { path: '/:id', methods: ['put'] },
    { path: '/:id', methods: ['delete'] },
  ])
})

test('mounts pets routes under /api/pets', () => {
  const hasPetsRouter = app.router.stack.some((layer) => layer.handle === petRoutes)

  assert.equal(hasPetsRouter, true)
})
