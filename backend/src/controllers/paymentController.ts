import { Request, Response } from "express"
import Hotel from "../models/Hotels"
import Stripe from "stripe"
import { BookingType } from "../shared/types"

const stripe = new Stripe(process.env.STRIPE_API_KEY as string)

export const Payment = async (req: Request, res: Response) => {
  try {
    const { numberOfNights } = req.body
    const hotelId = req.params.hotelId

    const hotel = await Hotel.findById(hotelId)

    if (!hotel) {
      return res.status(400).json({ message: "Hotel not found !" })
    }

    const totalCost = hotel.pricePerNight * numberOfNights

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCost,
      currency: "inr",
      metadata: {
        hotelId,
        userId: req.userId,
      },
    })

    if (!paymentIntent.client_secret) {
      return res.status(500).json({ message: "Error creating payment" })
    }

    const response = {
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
      totalCost,
    }

    res.send(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong !" })
  }
}

export const bookingController = async (req: Request, res: Response) => {
  try {
    const paymentIntentId = req.body.paymentIntentId

    const paymentIntent = await stripe.paymentIntents.retrieve(
      paymentIntentId as string
    )

    if (!paymentIntent) {
      return res.status(400).json({ message: "Payment intent not found !" })
    }

    if (
      paymentIntent.metadata.hotelId !== req.body.hotelId ||
      paymentIntent.metadata.userId !== req.body.userId
    ) {
      return res.status(400).json({ message: "Payment intent mismatch !" })
    }

    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({
        message: `Payment Intent Not successful. Status: ${paymentIntent.status}`,
      })
    }

    const newBooking: BookingType = {
      ...req.body,
      userId: req.userId,
    }

    const hotel = await Hotel.findByIdAndUpdate(
      { _id: req.params.hotelId },
      {
        $push: { bookings: newBooking },
      }
    )

    if (!hotel) {
      return res.status(400).json({ message: "Hotel not found !" })
    }

    await hotel.save()

    res.status(200).send()
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong !" })
  }
}
