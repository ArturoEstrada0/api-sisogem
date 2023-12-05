import mongoose from 'mongoose'

const sesionSchema = new mongoose.Schema({
  tipoSesion: String,
  numeroSesion: Number,
  fecha: String,
  horaInicio: String,
  enProgreso: Boolean,
})

const Sesion = mongoose.model('Sesion', sesionSchema)

export default Sesion
