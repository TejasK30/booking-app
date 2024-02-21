import express from "express"
const router = express.Router()
import registerController from "../controllers/UsersController"
import { check } from "express-validator"

router.post('/register', [
  check("firstname", "First Name is required").isString(),
  check("lastname", "Last Name is required").isString(),
  check("email", "Email is required").isEmail(),
  check("password", "Password is required with 6 or more characters.").isLength({ min: 8 })
] ,registerController)

export default router