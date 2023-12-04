import RolSchema from '../models/rol.js'

export const getRoles = async (req, res) => {
  const roles = await RolSchema.find()
  res.json(roles)
}
