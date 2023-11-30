import mongoose from 'mongoose'

const reporteCorreoSchema = new mongoose.Schema({
  subject: String,
  text: String,
  html: String,
  sentAt: Date,
})

const ReporteCorreo = mongoose.model('ReporteCorreo', reporteCorreoSchema)

export default ReporteCorreo
