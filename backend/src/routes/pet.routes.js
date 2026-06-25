import { Router } from 'express'

import { createPet, deletePet, getPet, listPets, updatePet } from '../controllers/pet.controller.js'
import { authenticateToken } from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/', authenticateToken, listPets)
router.get('/:id', authenticateToken, getPet)
router.post('/', authenticateToken, createPet)
router.put('/:id', authenticateToken, updatePet)
router.delete('/:id', authenticateToken, deletePet)

export default router
