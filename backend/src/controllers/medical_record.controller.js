import * as defaultMedicalService from '../services/medical_record.service.js'

function getService(req) {
  return req.services?.medicalService || defaultMedicalService
}
function getUserId(req) {
  const userId = req.userId || req.user?.id

  if (!userId) {
    const error = new Error(
      'User ID is missing from request. Ensure auth middleware is configured.',
    )
    error.status = 500
    throw error
  }

  return userId
}

export async function addRecord(req, res) {
  try {
    const userId = getUserId(req)
    const medicalService = getService(req)

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

    const isOwner = await medicalService.checkPetOwnership(pet_id, userId)
    if (!isOwner) {
      return res.status(404).json({ message: '找不到該寵物資訊' })
    }

    const newRecord = await medicalService.createRecord({
      pet_id,
      record_type,
      hospital_name,
      title,
      record_date,
      symptoms,
      diagnosis,
      prescription,
      image_url,
    })

    return res.status(201).json({ message: '新增醫療紀錄成功', data: newRecord })
  } catch (error) {
    console.error(error)

    if (error.name === 'ZodError') {
      const errorMessage = error.errors?.[0]?.message || '請求資料格式錯誤'
      return res.status(400).json({ message: errorMessage })
    }

    return res.status(500).json({ message: '新增醫療紀錄失敗，請稍後再試' })
  }
}

export async function getAllRecords(req, res) {
  try {
    const userId = getUserId(req)
    const medicalService = getService(req)

    const records = await medicalService.findAllRecordsByUserId(userId)
    return res.status(200).json({ data: records })
  } catch (error) {
    console.error(error)

    if (error.name === 'ZodError') {
      const errorMessage = error.errors?.[0]?.message || '請求資料格式錯誤'
      return res.status(400).json({ message: errorMessage })
    }

    return res.status(500).json({ message: '取得醫療紀錄失敗，請稍後再試' })
  }
}

export async function getPetRecords(req, res) {
  try {
    const userId = getUserId(req)
    const medicalService = getService(req)
    const { petId } = req.params

    const isOwner = await medicalService.checkPetOwnership(Number(petId), userId)
    if (!isOwner) {
      return res.status(404).json({ message: '找不到該寵物資訊' })
    }
    const records = await medicalService.findRecordsByPetId(Number(petId), userId)
    return res.status(200).json({ data: records })
  } catch (error) {
    console.error(error)

    if (error.name === 'ZodError') {
      const errorMessage = error.errors?.[0]?.message || '請求資料格式錯誤'
      return res.status(400).json({ message: errorMessage })
    }

    return res.status(500).json({ message: '取得醫療紀錄失敗，請稍後再試' })
  }
}

export async function getSingleRecord(req, res) {
  try {
    const userId = getUserId(req)
    const medicalService = getService(req)
    const { id } = req.params

    const record = await medicalService.findRecordById(Number(id), userId)
    if (!record) {
      return res.status(404).json({ message: '找不到該筆醫療紀錄' })
    }
    return res.status(200).json({ data: record })
  } catch (error) {
    console.error(error)

    if (error.name === 'ZodError') {
      const errorMessage = error.errors?.[0]?.message || '請求資料格式錯誤'
      return res.status(400).json({ message: errorMessage })
    }

    return res.status(500).json({ message: '取得醫療紀錄失敗，請稍後再試' })
  }
}

export async function updateRecord(req, res) {
  try {
    const userId = getUserId(req)
    const medicalService = getService(req)
    const { id } = req.params
    const updateData = req.body

    const record = await medicalService.findRecordById(Number(id), userId)
    if (!record) {
      return res.status(404).json({ message: '找不到該筆醫療紀錄' })
    }

    const updated = await medicalService.updateRecord(Number(id), updateData)
    return res.status(200).json({ message: '更新醫療紀錄成功', data: updated })
  } catch (error) {
    console.error(error)

    if (error.name === 'ZodError') {
      const errorMessage = error.errors?.[0]?.message || '請求資料格式錯誤'
      return res.status(400).json({ message: errorMessage })
    }

    return res.status(500).json({ message: '更新醫療紀錄失敗，請稍後再試' })
  }
}

export async function deleteRecord(req, res) {
  try {
    const userId = getUserId(req)
    const medicalService = getService(req)
    const { id } = req.params

    const record = await medicalService.findRecordById(Number(id), userId)
    if (!record) {
      return res.status(404).json({ message: '找不到該筆醫療紀錄' })
    }

    await medicalService.deleteRecord(Number(id))
    return res.status(200).json({ message: '刪除醫療紀錄成功' })
  } catch (error) {
    console.error(error)

    if (error.name === 'ZodError') {
      const errorMessage = error.errors?.[0]?.message || '請求資料格式錯誤'
      return res.status(400).json({ message: errorMessage })
    }

    return res.status(500).json({ message: '刪除醫療紀錄失敗，請稍後再試' })
  }
}
