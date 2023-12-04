import OrganismSchema from '../models/organism.js'

export const getOrganismos = async (req, res) => {
  const organismos = await OrganismSchema.find()
  res.status(200).json(organismos)
}
