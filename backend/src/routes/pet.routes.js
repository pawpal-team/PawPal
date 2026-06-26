import { Router } from 'express'

import { createPet, deletePet, getPet, listPets, updatePet } from '../controllers/pet.controller.js'
import { authenticateToken } from '../middlewares/auth.middleware.js'
import { validate } from '../middlewares/validate.js'
import { createPetSchema, updatePetSchema } from '../schemas/petSchema.js'

const router = Router()

router.get('/', authenticateToken, listPets)
router.get('/:id', authenticateToken, getPet)
router.post('/', authenticateToken, validate(createPetSchema), createPet)
router.patch('/:id', authenticateToken, validate(updatePetSchema), updatePet)
router.delete('/:id', authenticateToken, deletePet)

export default router
