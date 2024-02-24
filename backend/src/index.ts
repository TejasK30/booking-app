import { v2 as cloudinary } from 'cloudinary'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import authRoute from './routes/auth'
import hotelsRouter from './routes/my-hotels'
import userRoute from './routes/users'

dotenv.config({
  path: __dirname + '/.env'
})

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET
})

mongoose.connect(process.env.MONGO_URL as string)

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