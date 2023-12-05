import Organismo from '../models/organism.js'

export const getOrganismos = async (req, res) => {
  const organismos = await Organismo.find()
  res.status(200).json(organismos)
}
