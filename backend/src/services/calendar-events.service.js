import { pool } from '../config/db.js'

export async function getEventsByPetId(petId) {
  const result = await pool.query(
    `
      SELECT *
      FROM calendar_events
      WHERE pet_id = $1
      ORDER BY event_date, event_time
    `,
    [petId],
  )

  return result.rows
}

export async function getEventsByUserId(userId) {
  const result = await pool.query(
    `
      SELECT ce.*
      FROM calendar_events ce
      JOIN pets p ON ce.pet_id = p.id
      WHERE p.owner_id = $1
      ORDER BY ce.event_date, ce.event_time
    `,
    [userId],
  )

  return result.rows
}

export async function createEvent({ petId, title, eventDate, eventTime, type, location, notes }) {
  const result = await pool.query(
    `
      INSERT INTO calendar_events (pet_id, title, event_date, event_time, type, location, notes)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `,
    [petId, title, eventDate, eventTime ?? null, type, location ?? null, notes ?? null],
  )

  return result.rows[0]
}

export async function updateEvent(id, fields) {
  const allowed = ['title', 'event_date', 'event_time', 'type', 'location', 'notes', 'is_completed']

  const setClauses = []
  const values = []

  for (const [key, value] of Object.entries(fields)) {
    if (allowed.includes(key)) {
      setClauses.push(`${key} = $${values.length + 1}`)
      values.push(value)
    }
  }

  if (setClauses.length === 0) return null

  values.push(id)

  const result = await pool.query(
    `
      UPDATE calendar_events
      SET ${setClauses.join(', ')}
      WHERE id = $${values.length}
      RETURNING *
    `,
    values,
  )

  return result.rows[0] ?? null
}

export async function deleteEvent(id) {
  const result = await pool.query(
    `
      DELETE FROM calendar_events
      WHERE id = $1
      RETURNING id
    `,
    [id],
  )

  return result.rows[0] ?? null
}
