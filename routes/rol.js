import { Router } from 'express'
import { getRoles } from '../controllers/rolcontroller.js'

const router = Router()

router.get('/roles', getRoles)

export default router
