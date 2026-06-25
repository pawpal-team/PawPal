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

  const dbImageUrl = Array.isArray(image_url) ? image_url : image_url ? [image_url] : []

  const result = await pool.query(
    `INSERT INTO medical_records
      (pet_id, record_type, hospital_name, title, record_date, symptoms, diagnosis, prescription, image_url)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING *;`,
    [
      pet_id,
      record_type,
      hospital_name,
      title,
      record_date,
      symptoms,
      diagnosis,
      prescription,
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
  const {
    record_type,
    hospital_name,
    title,
    record_date,
    symptoms,
    diagnosis,
    prescription,
    image_url,
  } = data

  let dbImageUrl = undefined
  if (image_url !== undefined) {
    dbImageUrl = Array.isArray(image_url) ? image_url : image_url ? [image_url] : []
  }

  const result = await pool.query(
    `UPDATE medical_records
     SET record_type = COALESCE($1, record_type),
         hospital_name = COALESCE($2, hospital_name),
         title = COALESCE($3, title),
         record_date = COALESCE($4, record_date),
         symptoms = COALESCE($5, symptoms),
         diagnosis = COALESCE($6, diagnosis),
         prescription = COALESCE($7, prescription),
         image_url = COALESCE($8, image_url)
     WHERE id = $9
     RETURNING *;`,
    [
      record_type !== undefined ? record_type : null,
      hospital_name !== undefined ? hospital_name : null,
      title !== undefined ? title : null,
      record_date !== undefined ? record_date : null,
      symptoms !== undefined ? symptoms : null,
      diagnosis !== undefined ? diagnosis : null,
      prescription !== undefined ? prescription : null,
      dbImageUrl !== undefined ? dbImageUrl : null,
      id,
    ],
  )

  return result.rows[0]
}

export async function deleteRecord(id) {
  await pool.query(`DELETE FROM medical_records WHERE id = $1;`, [id])
  return true
}
