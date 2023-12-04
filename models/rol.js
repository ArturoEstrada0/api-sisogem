import mongoose from 'mongoose'

const RolSchema = mongoose.Schema({
  rol: {
    type: String,
    required: true,
  },
})

const Rol = mongoose.model('RolSchema', RolSchema)

export default Rol
