import express from 'express'
import Stripe from 'stripe'
import { getHotelById, searchController } from '../controllers/hotelsController'
import { param } from 'express-validator'
import verifyToken from 'middleware/auth'
import { Payment } from '../controllers/paymentController'
const router = express.Router()
const stripe = new Stripe(process.env.STRIPE_API_KEY as string)

router.get('/search', searchController)
router.get('/:id', [param("id").notEmpty().withMessage("Hotel ID is required")], getHotelById)
router.post('/:hotelId/bookings/payment-intent', verifyToken, Payment)

export default router