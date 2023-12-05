import User from '../models/user.js'
import Organismo from '../models/organism.js'

export const findUserByEmail = async (req, res) => {
  const { email } = req.body
  try {
    const usuario = await User.find({ email })
      .populate('organismo')
      .populate('rol')
      .exec()
    res.json(usuario.pop())
  } catch (err) {
    res.status(500).send(err)
  }
}

export const createUser = async (req, res) => {
  const userFromReq = req.body
  const mongoOrg = await Organismo.findById(userFromReq.organismo)

  const newUser = new User({
    name: userFromReq.name,
    rol: userFromReq.rol,
    full_charge: userFromReq.full_charge,
    email: userFromReq.email,
    date: userFromReq.date,
  })
  newUser.organismo.push(mongoOrg)
  try {
    const mongoRes = await newUser.save()
    res.status(201).send('GUARDADO!')
  } catch (error) {
    console.log(error)
    res.status(500).send('Ocurrió un error')
  }
}

export const deleteUserById = (req, res) => {
  const { id } = req.params
  User.remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }))
}
