import express, { Request, Response } from "express";
import { check } from "express-validator";
import loginController from "../controllers/authController";
import verifyToken from "../middleware/auth";
const router = express.Router()

router.post('/login', [
  check("email", "Email is required !").isEmail(),
  check("password", "Minimum password length of 6 or more characters is requried !").isLength({
    min: 6
  })
], loginController)


router.get('/verify-token', verifyToken, async(req: Request, res: Response) => {
  res.status(200).json({userId: req.userId})
})

router.post('/logout', async(req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    expires: new Date(0)
  })
  res.send()
})

export default router