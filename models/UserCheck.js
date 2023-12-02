import mongoose from 'mongoose'

const userSchemaCheck = new mongoose.Schema({
  email: String,
  organismo: String,
})

const UserCheck = mongoose.model('UserCheck', userSchemaCheck)

export default UserCheck
