import userSchema from '../models/user.js'

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
