import cloudinary from 'cloudinary'
import { Request, Response } from "express"
import Hotel, { HotelType } from "../models/Hotels"

const uploadImages = async (imageFiles: Express.Multer.File[]) => {
  const uploadPromises = imageFiles.map(async (image) => { 
    const b64 = Buffer.from(image.buffer).toString("base64")
    let dataURI = "data:" + image.mimetype + ";base64," + b64
    const res = await cloudinary.v2.uploader.upload(dataURI)
    return res.url
  })

  const imageUrls = await Promise.all(uploadPromises)
  return imageUrls
}


export const myHotelsController = async( req: Request, res: Response ) => {
  try{
    const imageFiles = req.files as Express.Multer.File[]
    const newHotel: HotelType = req.body;

    const imageUrls = await uploadImages(imageFiles)

    newHotel.imageUrls = imageUrls
    newHotel.lastUpdated = new Date()
    newHotel.userId = req.userId

    const hotel = new Hotel(newHotel)
    await hotel.save()

    res.status(201).send(hotel)
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: "Something went wrong" })
    }
}


export async function getAllHotels( req: Request, res: Response ){
  try {
    const hotels = await Hotel.find({userId: req.userId})
    res.json(hotels)
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Error fetching the hotesl !"})
  }
}