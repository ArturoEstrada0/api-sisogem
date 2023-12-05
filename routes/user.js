import { Router } from 'express'
import User from '../models/user.js'
import Sesion from '../models/sesion.js'
import {
  findUserByEmail,
  deleteUserById,
  createUser,
} from '../controllers/userController.js'

const router = Router()

// Crear usuario
router.post('/users', (req, res) => {
  const user = User(req.body)
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }))
})

// Obtener todos los usuarios
router.get('/users', (req, res) => {
  User.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }))
})

router.get('/listUser/:organismo', async (req, res) => {
  const organismoBuscar = req.params.organismo
  console.log(organismoBuscar)
  await User.find()
    .populate('organismo')
    .populate('rol')
    .exec((err, data) => {
      if (err) res.status(500)
      const usersToReturn = data.filter((user) => {
        if (!user.organismo) return false
        for (const organismoUser of user.organismo) {
          if (organismoUser.code == organismoBuscar) return true
        }
        return false
      })
      res.json(usersToReturn)
    })
})

// Obtener un usuario por ID
router.get('/users/:id', (req, res) => {
  const { id } = req.params
  User.findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }))
})

// Buscar usuario por correo electrónico
router.post('/email', findUserByEmail)

router.post('/create-user', createUser)

// Eliminar un usuario por ID
router.delete('/users/:id', deleteUserById)

// Actualizar un usuario por ID
router.put('/users/:id', (req, res) => {
  const { id } = req.params
  const { name, age, email } = req.body
  User.updateOne({ _id: id }, { $set: { name, age, email } })
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
