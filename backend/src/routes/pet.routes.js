import { Router } from 'express'

import { createPet, deletePet, getPet, listPets, updatePet } from '../controllers/pet.controller.js'

const router = Router()

// TODO(#85): Mount auth middleware on pets routes after JWT middleware is ready.
router.get('/', listPets)
router.get('/:id', getPet)
router.post('/', createPet)
router.put('/:id', updatePet)
router.delete('/:id', deletePet)

export default router
