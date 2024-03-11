import express from 'express'
import { getHotelById, searchController } from '../controllers/hotelsController'
import { param } from 'express-validator'
import verifyToken from '../middleware/auth'
import { Payment, bookingController } from '../controllers/paymentController'
const router = express.Router()

router.get('/search', searchController)
router.get('/:id', [param("id").notEmpty().withMessage("Hotel ID is required")], getHotelById)
router.post('/:hotelId/bookings/payment-intent', verifyToken, Payment)
router.post('/:hotelId/bookings', verifyToken, bookingController)

export default router