import { Router } from 'express'
import {
  getReportes,
  deleteReporte,
} from '../controllers/reportesController.js'

const router = Router()

router.get('/', getReportes)
router.delete('/:id', deleteReporte)

export default router
