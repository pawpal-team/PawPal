import * as defaultPetService from '../services/pet.service.js'

function parsePetId(id) {
  const parsedId = Number(id)

  if (!Number.isSafeInteger(parsedId) || parsedId <= 0) {
    return null
  }

  return parsedId
}

function isUniqueViolation(error) {
  return error?.code === '23505'
}

export function createPetController(petService) {
  async function listPets(req, res) {
    try {
      const pets = await petService.findPetsByUserId(req.userId)

      return res.status(200).json({ pets })
    } catch (error) {
      console.error(error)

      return res.status(500).json({ message: '取得寵物列表失敗，請稍後再試' })
    }
  }

  async function getPet(req, res) {
    const id = parsePetId(req.params.id)

    if (!id) {
      return res.status(400).json({ message: '寵物 ID 格式不正確' })
    }

    try {
      const pet = await petService.findPetByIdAndUserId(id, req.userId)

      if (!pet) {
        return res.status(404).json({ message: '找不到寵物' })
      }

      return res.status(200).json({ pet })
    } catch (error) {
      console.error(error)

      return res.status(500).json({ message: '取得寵物資料失敗，請稍後再試' })
    }
  }

  async function createPet(req, res) {
    try {
      const pet = await petService.createPetForUser(req.userId, req.body)

      return res.status(201).json({ pet })
    } catch (error) {
      console.error(error)

      if (isUniqueViolation(error)) {
        return res.status(409).json({ message: '寵物晶片號碼已被使用' })
      }

      return res.status(500).json({ message: '建立寵物失敗，請稍後再試' })
    }
  }

  async function updatePet(req, res) {
    const id = parsePetId(req.params.id)

    if (!id) {
      return res.status(400).json({ message: '寵物 ID 格式不正確' })
    }

    try {
      const pet = await petService.updatePetByIdAndUserId(id, req.userId, req.body)

      if (!pet) {
        return res.status(404).json({ message: '找不到寵物' })
      }

      return res.status(200).json({ pet })
    } catch (error) {
      console.error(error)

      if (isUniqueViolation(error)) {
        return res.status(409).json({ message: '寵物晶片號碼已被使用' })
      }

      return res.status(500).json({ message: '更新寵物失敗，請稍後再試' })
    }
  }

  async function deletePet(req, res) {
    const id = parsePetId(req.params.id)

    if (!id) {
      return res.status(400).json({ message: '寵物 ID 格式不正確' })
    }

    try {
      const deleted = await petService.deletePetByIdAndUserId(id, req.userId)

      if (!deleted) {
        return res.status(404).json({ message: '找不到寵物' })
      }

      return res.status(204).send()
    } catch (error) {
      console.error(error)

      return res.status(500).json({ message: '刪除寵物失敗，請稍後再試' })
    }
  }

  return {
    listPets,
    getPet,
    createPet,
    updatePet,
    deletePet,
  }
}

export const { listPets, getPet, createPet, updatePet, deletePet } =
  createPetController(defaultPetService)
