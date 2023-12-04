import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  rol: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RolSchema',
  },
  organismo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'OrganismSchema',
    },
  ],

  full_charge: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  date: {
    type: Number,
    required: true,
  },
})

const User = mongoose.model('User', userSchema)

export default User
