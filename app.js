import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import reportesRoutes from './routes/reportes.js'
import emailRoutes from './routes/email.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch((error) => console.error(error))

app.use('/reportes', reportesRoutes)
app.use('/email', emailRoutes)

export default app
