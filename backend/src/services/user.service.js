import { pool } from '../config/db.js'

export async function findUserById(id) {
  const result = await pool.query(
    `
      SELECT id, email, name, avatar_url, created_at
      FROM users
      WHERE id = $1
    `,
    [id],
  )

  return result.rows[0] || null
}
