import { Router } from 'express'
import { getRoles } from '../controllers/rolController.js'

const router = Router()

router.get('/', getRoles)

export default router
