import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import userRoute from './routes/users'
import authRoute from './routes/auth'
import hotelsRouter from './routes/my-hotels'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET
})

mongoose.connect(process.env.MONGO_URL)

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}))

app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/my-hotels', hotelsRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port: ${process.env.PORT}`)  
})