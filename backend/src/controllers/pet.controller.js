import * as defaultPetService from '../services/pet.service.js'

const writableFields = [
  'name',
  'species',
  'breed',
  'gender',
  'birthday',
  'weight',
  'microchip_number',
  'neutered',
  'blood_type',
  'fur_color',
  'notes',
  'avatar_url',
]

function parsePetId(id) {
  const parsedId = Number(id)

  if (!Number.isSafeInteger(parsedId) || parsedId <= 0) {
    return null
  }

  return parsedId
}

function normalizePetData(body, { requireCreateFields = false } = {}) {
  const petData = {}

  writableFields.forEach((field) => {
    if (Object.hasOwn(body, field)) {
      petData[field] = typeof body[field] === 'string' ? body[field].trim() : body[field]
    }
  })

  if (
    requireCreateFields &&
    (typeof petData.name !== 'string' ||
      petData.name.length === 0 ||
      typeof petData.species !== 'string' ||
      petData.species.length === 0)
  ) {
    return {
      ok: false,
      message: 'name and species are required',
    }
  }

  if (
    Object.hasOwn(petData, 'name') &&
    (typeof petData.name !== 'string' || petData.name.length === 0)
  ) {
    return {
      ok: false,
      message: 'name must be a non-empty string',
    }
  }

  if (
    Object.hasOwn(petData, 'species') &&
    (typeof petData.species !== 'string' || petData.species.length === 0)
  ) {
    return {
      ok: false,
      message: 'species must be a non-empty string',
    }
  }

  if (!requireCreateFields && Object.keys(petData).length === 0) {
    return {
      ok: false,
      message: 'At least one pet field is required',
    }
  }

  return {
    ok: true,
    petData,
  }
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
    const normalized = normalizePetData(req.body, { requireCreateFields: true })

    if (!normalized.ok) {
      return res.status(400).json({ message: normalized.message })
    }

    try {
      const pet = await petService.createPetForUser(req.userId, normalized.petData)

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

    const normalized = normalizePetData(req.body)

    if (!normalized.ok) {
      return res.status(400).json({ message: normalized.message })
    }

    try {
      const pet = await petService.updatePetByIdAndUserId(id, req.userId, normalized.petData)

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
