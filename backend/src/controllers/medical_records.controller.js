import {
  checkPetOwnership as checkPetOwnershipService,
  createRecord as createRecordService,
  findAllRecordsByUserId as findAllRecordsByUserIdService,
  findRecordsByPetId as findRecordsByPetIdService,
  findRecordById as findRecordByIdService,
  updateRecord as updateRecordService,
  deleteRecord as deleteRecordService,
} from '../services/medical_records.service.js'

function getUserId(req) {
  const userId = req.userId || req.user?.id
  if (!userId) {
    const error = new Error('未授權，請重新登入')
    error.status = 401
    throw error
  }
  return userId
}

function parseId(id) {
  const parsed = Number(id)
  if (!Number.isSafeInteger(parsed) || parsed <= 0) {
    const error = new Error('id 必須是正整數')
    error.status = 400
    throw error
  }
  return parsed
}

export function createAddRecord({
  checkPetOwnership: injectCheckPetOwnership,
  createRecord: injectCreateRecord,
}) {
  return async function addRecord(req, res) {
    try {
      const userId = getUserId(req)
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
      } = req.body

      const isOwner = await injectCheckPetOwnership(pet_id, userId)
      if (!isOwner) {
        return res.status(404).json({ message: '找不到該寵物資訊' })
      }

      const newRecord = await injectCreateRecord({
        pet_id,
        record_type,
        hospital_name: hospital_name || null,
        title,
        record_date,
        symptoms: symptoms || null,
        diagnosis: diagnosis || null,
        prescription: prescription || null,
        image_url: image_url || [],
      })

      return res.status(201).json({ message: '新增醫療紀錄成功', data: newRecord })
    } catch (error) {
      console.error(error.stack)
      return res.status(error.status || 500).json({
        message: error.status ? error.message : '新增醫療紀錄失敗，請稍後再試',
      })
    }
  }
}
export const addRecord = createAddRecord({
  checkPetOwnership: checkPetOwnershipService,
  createRecord: createRecordService,
})

export function createGetAllRecords({ findAllRecordsByUserId: injectFindAllRecordsByUserId }) {
  return async function getAllRecords(req, res) {
    try {
      const userId = getUserId(req)
      const records = await injectFindAllRecordsByUserId(userId)
      return res.status(200).json({ data: records })
    } catch (error) {
      console.error(error.stack)
      return res.status(error.status || 500).json({
        message: error.status ? error.message : '取得醫療紀錄失敗，請稍後再試',
      })
    }
  }
}
export const getAllRecords = createGetAllRecords({
  findAllRecordsByUserId: findAllRecordsByUserIdService,
})

export function createGetPetRecords({
  checkPetOwnership: injectCheckPetOwnership,
  findRecordsByPetId: injectFindRecordsByPetId,
}) {
  return async function getPetRecords(req, res) {
    try {
      const userId = getUserId(req)
      const { petId } = req.params
      const parsedPetId = parseId(petId)

      const isOwner = await injectCheckPetOwnership(parsedPetId, userId)
      if (!isOwner) {
        return res.status(404).json({ message: '找不到該寵物資訊' })
      }

      const records = await injectFindRecordsByPetId(parsedPetId, userId)
      return res.status(200).json({ data: records })
    } catch (error) {
      console.error(error.stack)
      return res.status(error.status || 500).json({
        message: error.status ? error.message : '取得醫療紀錄失敗，請稍後再試',
      })
    }
  }
}
export const getPetRecords = createGetPetRecords({
  checkPetOwnership: checkPetOwnershipService,
  findRecordsByPetId: findRecordsByPetIdService,
})

export function createGetSingleRecord({ findRecordById: injectFindRecordById }) {
  return async function getSingleRecord(req, res) {
    try {
      const userId = getUserId(req)
      const { id } = req.params
      const parsedId = parseId(id)

      const record = await injectFindRecordById(parsedId, userId)
      if (!record) {
        return res.status(404).json({ message: '找不到該筆醫療紀錄' })
      }
      return res.status(200).json({ data: record })
    } catch (error) {
      console.error(error.stack)
      return res.status(error.status || 500).json({
        message: error.status ? error.message : '取得醫療紀錄失敗，請稍後再試',
      })
    }
  }
}
export const getSingleRecord = createGetSingleRecord({
  findRecordById: findRecordByIdService,
})

export function createUpdateRecord({
  findRecordById: injectFindRecordById,
  checkPetOwnership: injectCheckPetOwnership,
  updateRecord: injectUpdateRecord,
}) {
  return async function updateRecord(req, res) {
    try {
      const userId = getUserId(req)
      const { id } = req.params
      const updateData = req.body
      const parsedId = parseId(id)

      const record = await injectFindRecordById(parsedId, userId)
      if (!record) {
        return res.status(404).json({ message: '找不到該筆醫療紀錄' })
      }

      if (updateData.pet_id) {
        const isNewOwner = await injectCheckPetOwnership(updateData.pet_id, userId)
        if (!isNewOwner) {
          return res.status(403).json({ message: '無權限將紀錄移轉至該寵物' })
        }
      }

      const updated = await injectUpdateRecord(parsedId, updateData)
      return res.status(200).json({ message: '更新醫療紀錄成功', data: updated })
    } catch (error) {
      console.error(error.stack)
      return res.status(error.status || 500).json({
        message: error.status ? error.message : '更新醫療紀錄失敗，請稍後再試',
      })
    }
  }
}
export const updateRecord = createUpdateRecord({
  findRecordById: findRecordByIdService,
  checkPetOwnership: checkPetOwnershipService,
  updateRecord: updateRecordService,
})

export function createDeleteRecord({
  findRecordById: injectFindRecordById,
  deleteRecord: injectDeleteRecord,
}) {
  return async function deleteRecord(req, res) {
    try {
      const userId = getUserId(req)
      const { id } = req.params
      const parsedId = parseId(id)

      const record = await injectFindRecordById(parsedId, userId)
      if (!record) {
        return res.status(404).json({ message: '找不到該筆醫療紀錄' })
      }

      await injectDeleteRecord(parsedId)
      return res.status(200).json({ message: '刪除醫療紀錄成功' })
    } catch (error) {
      console.error(error.stack)
      return res.status(error.status || 500).json({
        message: error.status ? error.message : '刪除醫療紀錄失敗，請稍後再試',
      })
    }
  }
}
export const deleteRecord = createDeleteRecord({
  findRecordById: findRecordByIdService,
  deleteRecord: deleteRecordService,
})
