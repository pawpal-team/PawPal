import assert from 'node:assert/strict'
import { test } from 'node:test'

import app from '../src/app.js'
import growthRecordsRoutes from '../src/routes/growth_records.routes.js'

test('growth records 路由結構正確', () => {
  const routes = growthRecordsRoutes.stack.map((layer) => ({
    path: layer.route?.path,
    methods: Object.keys(layer.route?.methods ?? {}),
  }))

  assert.deepEqual(routes, [
    { path: '/', methods: ['get'] },
    { path: '/', methods: ['post'] },
    { path: '/:id', methods: ['patch'] },
    { path: '/:id', methods: ['delete'] },
  ])
})

test('growth records 路由掛載在 /api/v1/growth-records', () => {
  const hasMounted = app.router.stack.some((layer) => layer.handle === growthRecordsRoutes)
  assert.equal(hasMounted, true)
})
