import express from 'express'
import {
  getReportes,
  deleteReporte,
} from '../controllers/reportesController.js'

const router = express.Router()

router.get('/', getReportes)
router.delete('/:id', deleteReporte)

export default router
