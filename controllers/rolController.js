import Rol from '../models/rol.js'

export const getRoles = async (req, res) => {
  const roles = await Rol.find()
  res.json(roles)
}
