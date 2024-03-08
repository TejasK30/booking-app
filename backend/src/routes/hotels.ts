import express from 'express'
import { getHotelById, searchController } from '../controllers/hotelsController'
import { param } from 'express-validator'
const router = express.Router()

router.get('/search', searchController)
router.get('/:id', [param("id").notEmpty().withMessage("Hotel ID is required")], getHotelById)

export default router