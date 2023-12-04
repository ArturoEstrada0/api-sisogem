import { Router } from 'express'
import { getOrganismos } from '../controllers/organismoController.js'

const router = Router()

router.get('/organismos', getOrganismos)

export default router
