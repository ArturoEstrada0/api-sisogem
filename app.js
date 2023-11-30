import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch((error) => console.error(error))

const userSchema = new mongoose.Schema({
  email: String,
  organismo: String,
})

const User = mongoose.model('User', userSchema)

const reporteCorreoSchema = new mongoose.Schema({
  subject: String,
  text: String,
  html: String,
  sentAt: Date,
})

const ReporteCorreo = mongoose.model('ReporteCorreo', reporteCorreoSchema)

app.get('/reportes', async (req, res) => {
  const reportes = await ReporteCorreo.find({})
  res.status(200).json(reportes)
})

app.delete('/reportes/:id', async (req, res) => {
  try {
    await ReporteCorreo.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Reporte eliminado con éxito' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al eliminar el reporte' })
  }
})

app.post('/email', (req, res) => {
  async function main() {
    let transporter = nodemailer.createTransport({
      host: process.env.AWS_SES_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.AWS_SES_USER,
        pass: process.env.AWS_SES_PASS,
      },
    })

    let organismoBuscado = 'universidad-puma'
    let users = await User.find({ organismo: organismoBuscado })
    let emails = users.map((user) => user.email).join(',')

    console.log(emails)

    if (emails.length > 0) {
      let info = await transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to: emails,
        subject: req.body.subject,
        text: req.body.text,
        html: req.body.html,
      })

      let reporte = new ReporteCorreo({
        subject: req.body.subject,
        text: req.body.text,
        html: req.body.html,
        sentAt: new Date(),
      })

      await reporte.save()

      console.log('Message sent: %s', info.messageId)
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
      res.status(200).json({
        ok: true,
        message: 'Se envio correctamente',
      })
    } else {
      console.log('No se encontraron destinatarios')
      res.status(400).json({
        ok: false,
        message: 'No se encontraron destinatarios',
      })
    }
  }

  main().catch(console.error)
})

app.listen(3002, () => {
  console.log('Server is running on port 3002')
})
