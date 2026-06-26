import * as defaultPetService from '../services/pet.service.js'

function parsePetId(id) {
  const parsedId = Number(id)

  if (!Number.isSafeInteger(parsedId) || parsedId <= 0) {
    return null
  }

  return parsedId
}

export function createPetController(petService) {
  async function listPets(req, res) {
    try {
      const pets = await petService.findPetsByUserId(req.userId)

      return res.status(200).json({ pets })
    } catch (error) {
      console.error(error)

      return res.status(500).json({ message: 'Failed to fetch pets' })
    }
  }

  async function getPet(req, res) {
    const id = parsePetId(req.params.id)

    if (!id) {
      return res.status(400).json({ message: 'Invalid pet id' })
    }

    try {
      const pet = await petService.findPetByIdAndUserId(id, req.userId)

      if (!pet) {
        return res.status(404).json({ message: 'Pet not found' })
      }

      return res.status(200).json({ pet })
    } catch (error) {
      console.error(error)

      return res.status(500).json({ message: 'Failed to fetch pet' })
    }
  }

  async function createPet(req, res) {
    try {
      const pet = await petService.createPetForUser(req.userId, req.body)

      return res.status(201).json({ pet })
    } catch (error) {
      console.error(error)

      return res.status(500).json({ message: 'Failed to create pet' })
    }
  }

  async function updatePet(req, res) {
    const id = parsePetId(req.params.id)

    if (!id) {
      return res.status(400).json({ message: 'Invalid pet id' })
    }

    try {
      const pet = await petService.updatePetByIdAndUserId(id, req.userId, req.body)

      if (!pet) {
        return res.status(404).json({ message: 'Pet not found' })
      }

      return res.status(200).json({ pet })
    } catch (error) {
      console.error(error)

      return res.status(500).json({ message: 'Failed to update pet' })
    }
  }

  async function deletePet(req, res) {
    const id = parsePetId(req.params.id)

    if (!id) {
      return res.status(400).json({ message: 'Invalid pet id' })
    }

    try {
      const deleted = await petService.deletePetByIdAndUserId(id, req.userId)

      if (!deleted) {
        return res.status(404).json({ message: 'Pet not found' })
      }

      return res.status(204).send()
    } catch (error) {
      console.error(error)

      return res.status(500).json({ message: 'Failed to delete pet' })
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
