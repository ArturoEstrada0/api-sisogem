import { Router } from 'express'
import userSchema from '../models/user.js'
import Sesion from '../models/sesion.js'
import {
  findUserByEmail,
  deleteUserById,
} from '../controllers/userController.js'

const router = Router()

// Crear usuario
router.post('/users', (req, res) => {
  const user = userSchema(req.body)
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }))
})

// Obtener todos los usuarios
router.get('/users', (req, res) => {
  userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }))
})

// Obtener un usuario por ID
router.get('/users/:id', (req, res) => {
  const { id } = req.params
  userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }))
})

// Buscar usuario por correo electrónico
router.post('/user/email', findUserByEmail)

// Eliminar un usuario por ID
router.delete('/users/:id', deleteUserById)

// Actualizar un usuario por ID
router.put('/users/:id', (req, res) => {
  const { id } = req.params
  const { name, age, email } = req.body
  userSchema
    .updateOne({ _id: id }, { $set: { name, age, email } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }))
})

// Crear sesión
router.post('/sesiones', (req, res) => {
  const sesion = new Sesion(req.body)
  sesion
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }))
})

// Obtener sesiones en progreso
router.get('/sesiones-en-progreso', async (req, res) => {
  try {
    const sesiones = await Sesion.find({ enProgreso: true })
    res.json(sesiones)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Finalizar sesión
router.delete('/finalizar-sesion/:id', async (req, res) => {
  try {
    const sesion = await Sesion.findById(req.params.id)
    if (sesion) {
      sesion.enProgreso = false
      await sesion.save()
      res.json({ message: 'Sesión finalizada correctamente' })
    } else {
      res.status(404).json({ message: 'Sesión no encontrada' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
