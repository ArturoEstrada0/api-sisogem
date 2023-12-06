import nodemailer from 'nodemailer'
import User from '../models/user.js'
import ReporteCorreo from '../models/ReporteCorreo.js'
import Organismo from '../models/organism.js'

export const sendEmail = async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.AWS_SES_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.AWS_SES_USER,
        pass: process.env.AWS_SES_PASS,
      },
    })

    const organismoCode = req.body.organismo
    console.log(organismoCode)
    const organismo = await Organismo.findOne({ code: organismoCode })
    if (!organismo) {
      console.log('No se encontro el organismo')
      return
    }

    const organismoId = organismo._id
    const users = await User.find({ organismo: { $in: [organismoId] } })
    const emails = users.map((user) => user.email).join(',')
    console.log(emails)

    if (emails.length > 0) {
      const info = await transporter.sendMail({
        from: 'wlinx11@gmail.com',
        to: emails,
        subject: req.body.subject,
        text: req.body.text,
        html: `<p>${req.body.html}</p>`,
      })

      const reporte = new ReporteCorreo({
        subject: req.body.subject,
        text: req.body.text,
        html: req.body.html,
        organismo: req.body.organismo,
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
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Ocurrio un error al enviar el correo',
    })
    console.error(error)
  }
}
