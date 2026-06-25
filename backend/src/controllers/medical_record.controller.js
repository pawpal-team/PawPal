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
      return res.status(404).json({ message: 'Pet not found' })
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


    return res.status(201).json({ message: 'Medical record created successfully', data: newRecord })
  } catch (error) {
    console.error(error)


    if (error.name === 'ZodError') {
      const errorMessage = error.errors?.[0]?.message || 'Validation error'
      return res.status(400).json({ message: errorMessage })
    }


    return res.status(500).json({ message: 'Internal server error' })
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
      const errorMessage = error.errors?.[0]?.message || 'Validation error'
      return res.status(400).json({ message: errorMessage })
    }


    return res.status(500).json({ message: 'Internal server error' })
  }
}


export async function getPetRecords(req, res) {
  try {
    const userId = getUserId(req)
    const medicalService = getService(req)
    const { petId } = req.params


    const isOwner = await medicalService.checkPetOwnership(Number(petId), userId)
    if (!isOwner) {
      return res.status(404).json({ message: 'Pet not found' })
    }
    const records = await medicalService.findRecordsByPetId(Number(petId), userId)
    return res.status(200).json({ data: records })
  } catch (error) {
    console.error(error)


    if (error.name === 'ZodError') {
      const errorMessage = error.errors?.[0]?.message || 'Validation error'
      return res.status(400).json({ message: errorMessage })
    }


    return res.status(500).json({ message: 'Internal server error' })
  }
}


export async function getSingleRecord(req, res) {
  try {
    const userId = getUserId(req)
    const medicalService = getService(req)
    const { id } = req.params


    const record = await medicalService.findRecordById(Number(id), userId)
    if (!record) {
      return res.status(404).json({ message: 'Medical record not found' })
    }
    return res.status(200).json({ data: record })
  } catch (error) {
    console.error(error)


    if (error.name === 'ZodError') {
      const errorMessage = error.errors?.[0]?.message || 'Validation error'
      return res.status(400).json({ message: errorMessage })
    }


    return res.status(500).json({ message: 'Internal server error' })
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
      return res.status(404).json({ message: 'Medical record not found' })
    }


    const updated = await medicalService.updateRecord(Number(id), updateData)
    return res.status(200).json({ message: 'Medical record updated successfully', data: updated })
  } catch (error) {
    console.error(error)


    if (error.name === 'ZodError') {
      const errorMessage = error.errors?.[0]?.message || 'Validation error'
      return res.status(400).json({ message: errorMessage })
    }


    return res.status(500).json({ message: 'Internal server error' })
  }
}


export async function deleteRecord(req, res) {
  try {
    const userId = getUserId(req)
    const medicalService = getService(req)
    const { id } = req.params


    const record = await medicalService.findRecordById(Number(id), userId)
    if (!record) {
      return res.status(404).json({ message: 'Medical record not found' })
    }


    await medicalService.deleteRecord(Number(id))
    return res.status(200).json({ message: 'Medical record deleted successfully' })
  } catch (error) {
    console.error(error)


    if (error.name === 'ZodError') {
      const errorMessage = error.errors?.[0]?.message || 'Validation error'
      return res.status(400).json({ message: errorMessage })
    }


    return res.status(500).json({ message: 'Internal server error' })
  }
}