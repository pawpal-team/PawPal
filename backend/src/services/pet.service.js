import { pool } from '../config/db.js'

const PET_COLUMNS = `
  id,
  user_id,
  name,
  species,
  breed,
  gender,
  birthday,
  weight,
  microchip_number,
  neutered,
  blood_type,
  fur_color,
  notes,
  avatar_url,
  created_at
`

const updateColumnMap = {
  name: 'name',
  species: 'species',
  breed: 'breed',
  gender: 'gender',
  birthday: 'birthday',
  weight: 'weight',
  microchip_number: 'microchip_number',
  neutered: 'neutered',
  blood_type: 'blood_type',
  fur_color: 'fur_color',
  notes: 'notes',
  avatar_url: 'avatar_url',
}

export async function findPetsByUserId(userId) {
  const result = await pool.query(
    `
      SELECT ${PET_COLUMNS}
      FROM pets
      WHERE user_id = $1
      ORDER BY id ASC
    `,
    [userId],
  )

  return result.rows
}

export async function findPetByIdAndUserId(id, userId) {
  const result = await pool.query(
    `
      SELECT ${PET_COLUMNS}
      FROM pets
      WHERE id = $1
        AND user_id = $2
      LIMIT 1
    `,
    [id, userId],
  )

  return result.rows[0] ?? null
}

export async function createPetForUser(userId, petData) {
  const result = await pool.query(
    `
      INSERT INTO pets (
        user_id,
        name,
        species,
        breed,
        gender,
        birthday,
        weight,
        microchip_number,
        neutered,
        blood_type,
        fur_color,
        notes,
        avatar_url
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING ${PET_COLUMNS}
    `,
    [
      userId,
      petData.name,
      petData.species,
      petData.breed ?? null,
      petData.gender ?? null,
      petData.birthday ?? null,
      petData.weight ?? null,
      petData.microchip_number ?? null,
      petData.neutered ?? false,
      petData.blood_type ?? null,
      petData.fur_color ?? null,
      petData.notes ?? null,
      petData.avatar_url ?? null,
    ],
  )

  return result.rows[0]
}

export async function updatePetByIdAndUserId(id, userId, petData) {
  const entries = Object.entries(petData).filter(([field]) => field in updateColumnMap)

  if (entries.length === 0) {
    return null
  }

  const setClauses = entries.map(([field], index) => `${updateColumnMap[field]} = $${index + 1}`)
  const values = entries.map(([, value]) => value)
  values.push(id, userId)

  const result = await pool.query(
    `
      UPDATE pets
      SET ${setClauses.join(', ')}
      WHERE id = $${values.length - 1} AND user_id = $${values.length}
      RETURNING ${PET_COLUMNS}
    `,
    values,
  )

  return result.rows[0] ?? null
}

export async function deletePetByIdAndUserId(id, userId) {
  const result = await pool.query(
    `
      DELETE FROM pets
      WHERE id = $1 AND user_id = $2
    `,
    [id, userId],
  )

  return result.rowCount > 0
}
