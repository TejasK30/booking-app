import express from "express"
const router = express.Router()
import { registerController, findUserController } from "../controllers/UsersController"
import { check } from "express-validator"
import verifyToken from "../middleware/auth"

router.get("/me", verifyToken, findUserController)

router.post('/register', [
  check("firstname", "First Name is required").isString(),
  check("lastname", "Last Name is required").isString(),
  check("email", "Email is required").isEmail(),
  check("password", "Password is required with 6 or more characters.").isLength({ min: 8 })
] ,registerController)

export default router