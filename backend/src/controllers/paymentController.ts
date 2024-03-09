import { Request, Response, response } from "express"
import Hotel from "../models/Hotels"
import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_API_KEY as string)

export const Payment = async (req: Request, res: Response) => {
  try {

    const { numberOfNights } = req.body
    const hotelId = req.params.hotelId

    const hotel = await Hotel.findById(hotelId)
    
    if(!hotel){
      res.status(400).json({message: "Hotel not found !"})
    }

    const totalCost = hotel.pricePerNight * numberOfNights

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCost,
      currency: "inr",
      metadata: {
        hotelId,
        userId: req.userId
      }
    })

    if(!paymentIntent.client_secret){
      res.status(500).json({message: "Error creating payment"})
    }
    
    const response = {
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
      totalCost
    }

    res.send(response)

  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Something went wrong !"})
  }
}
