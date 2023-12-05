import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import reportesRoutes from './routes/reportes.js'
import emailRoutes from './routes/email.js'
import userRoutes from './routes/user.js'
import rolRoutes from './routes/rol.js'
import organismoRoutes from './routes/organismo.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

//Conexión a la base de datos
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch((error) => console.error(error))

//Middlewares
app.use('/reportes', reportesRoutes)
app.use('/email', emailRoutes)
app.use('/user', userRoutes)
app.use('/rol', rolRoutes)
app.use('/organismo', organismoRoutes)

export default app
