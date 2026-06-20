import { pool } from '../config/db.js'

export async function findUserByEmail(email) {
  const result = await pool.query('SELECT id, email FROM users WHERE email = $1 LIMIT 1', [email])
  return result.rows[0] ?? null
}

export async function createUser({ name, email, password }) {
  const result = await pool.query(
    `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, name, email, created_at
    `,
    [name, email, password],
  )

  return result.rows[0]
}
