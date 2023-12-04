import userSchema from '../models/user.js'
import OrganismSchema from '../models/organism.js'

export const findUserByEmail = (req, res) => {
  const { email } = req.body
  userSchema
    .find({ email })
    .then((data) => {
      return res.json(data)
    })
    .catch((error) => res.json({ message: error }))
}

export const deleteUserById = (req, res) => {
  const { id } = req.params
  userSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }))
}

export const createUser = async (req, res) => {
  const userFromReq = req.body
  const mongoOrg = await OrganismSchema.findById(userFromReq.organismo)

  const newUser = new UserSchema({
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
