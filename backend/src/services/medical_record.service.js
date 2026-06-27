import { pool } from '../config/db.js'

export async function checkPetOwnership(petId, userId) {
  const result = await pool.query(`SELECT id FROM pets WHERE id = $1 AND user_id = $2;`, [
    petId,
    userId,
  ])
  return result.rows.length > 0
}

export async function createRecord(data) {
  const {
    pet_id,
    record_type,
    hospital_name,
    title,
    record_date,
    symptoms,
    diagnosis,
    prescription,
    image_url,
  } = data

  const dbImageUrl = Array.isArray(image_url)
    ? image_url
    : typeof image_url === 'string' && image_url.trim()
      ? [image_url]
      : []

  const result = await pool.query(
    `INSERT INTO medical_records
      (pet_id, record_type, hospital_name, title, record_date, symptoms, diagnosis, prescription, image_url)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING *;`,
    [
      pet_id,
      record_type,
      hospital_name || null,
      title,
      record_date,
      symptoms || null,
      diagnosis || null,
      prescription || null,
      dbImageUrl,
    ],
  )
  return result.rows[0]
}

export async function findAllRecordsByUserId(userId) {
  const result = await pool.query(
    `SELECT mr.*
     FROM medical_records mr
     JOIN pets p ON p.id = mr.pet_id
     WHERE p.user_id = $1
     ORDER BY mr.record_date DESC, mr.id DESC;`,
    [userId],
  )
  return result.rows
}

export async function findRecordsByPetId(petId, userId) {
  const result = await pool.query(
    `SELECT mr.*
     FROM medical_records mr
     JOIN pets p ON p.id = mr.pet_id
     WHERE mr.pet_id = $1
     AND p.user_id = $2
     ORDER BY mr.record_date DESC, mr.id DESC;`,
    [petId, userId],
  )
  return result.rows
}

export async function findRecordById(id, userId) {
  const result = await pool.query(
    `SELECT mr.*
     FROM medical_records mr
     JOIN pets p ON p.id = mr.pet_id
     WHERE mr.id = $1
     AND p.user_id = $2;`,
    [id, userId],
  )
  return result.rows[0] || null
}

export async function updateRecord(id, data) {
  const fields = []
  const values = []

  if (data.pet_id !== undefined) {
    fields.push(`pet_id = $${values.length + 1}`)
    values.push(data.pet_id)
  }
  if (data.record_type !== undefined) {
    fields.push(`record_type = $${values.length + 1}`)
    values.push(data.record_type)
  }
  if (data.hospital_name !== undefined) {
    fields.push(`hospital_name = $${values.length + 1}`)
    values.push(data.hospital_name)
  }
  if (data.title !== undefined) {
    fields.push(`title = $${values.length + 1}`)
    values.push(data.title)
  }
  if (data.record_date !== undefined) {
    fields.push(`record_date = $${values.length + 1}`)
    values.push(data.record_date)
  }
  if (data.symptoms !== undefined) {
    fields.push(`symptoms = $${values.length + 1}`)
    values.push(data.symptoms)
  }
  if (data.diagnosis !== undefined) {
    fields.push(`diagnosis = $${values.length + 1}`)
    values.push(data.diagnosis)
  }
  if (data.prescription !== undefined) {
    fields.push(`prescription = $${values.length + 1}`)
    values.push(data.prescription)
  }
  if (data.image_url !== undefined) {
    const dbImageUrl = Array.isArray(data.image_url)
      ? data.image_url
      : typeof data.image_url === 'string' && data.image_url.trim()
        ? [data.image_url]
        : []
    fields.push(`image_url = $${values.length + 1}`)
    values.push(dbImageUrl)
  }

  if (fields.length === 0) {
    const error = new Error('沒有可更新欄位')
    error.status = 400
    throw error
  }

  const idParamIndex = values.length + 1
  values.push(id)

  const result = await pool.query(
    `UPDATE medical_records
     SET ${fields.join(', ')}
     WHERE id = $${idParamIndex}
     RETURNING *;`,
    values,
  )

  return result.rows[0] || null
}

export async function deleteRecord(id) {
  const result = await pool.query(`DELETE FROM medical_records WHERE id = $1;`, [id])
  return result.rowCount > 0
}
