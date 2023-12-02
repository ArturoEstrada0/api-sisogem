import nodemailer from 'nodemailer'
import UserCheck from '../models/UserCheck.js'
import ReporteCorreo from '../models/ReporteCorreo.js'

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

    const organismoBuscado = 'universidad-puma'
    const users = await UserCheck.find({ organismo: organismoBuscado })
    const emails = users.map((user) => user.email).join(',')

    if (emails.length > 0) {
      const info = await transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to: emails,
        subject: req.body.subject,
        text: req.body.text,
        html: `<p>${req.body.html}</p>`,
      })

      const reporte = new ReporteCorreo({
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
  } catch (error) {
    console.error(error)
  }
}
