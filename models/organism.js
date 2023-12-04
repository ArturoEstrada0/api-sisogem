import mongoose from 'mongoose'

const OrganismSchema = new mongoose.Schema({
  organism: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    require: true,
  },
})

const Organismo = mongoose.model('OrganismSchema', OrganismSchema)

export default Organismo
