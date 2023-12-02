import mongoose from 'mongoose'

const sesionSchema = new mongoose.Schema({
  tipoSesion: String,
  numeroSesion: Number,
  fecha: String,
  horaInicio: String,
  enProgreso: Boolean,
})

const sesion = mongoose.model('Sesion', sesionSchema)

export default sesion
