import express from 'express'
import { body } from 'express-validator'
import multer from "multer"
import { myHotelsController } from '../controllers/hotelsController'
import verifyToken from '../middleware/auth'
const router = express.Router()

const storage = multer.memoryStorage()

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 //5mb
  }
})
router.get("/", verifyToken, upload.array("imageFiles", 6), verifyToken, [
  body("name").notEmpty().withMessage("Name is required!"),
  body("city").notEmpty().withMessage("City is required!"),
  body("country").notEmpty().withMessage("Country is required!"),
  body("type").notEmpty().withMessage("Hote type is required!"),
  body("pricePerNight").notEmpty().isNumeric().withMessage("Price per night is required abd must be a number!"),
  body("facilities").notEmpty().isArray().withMessage("Facilities are required!")
], myHotelsController )

export default router