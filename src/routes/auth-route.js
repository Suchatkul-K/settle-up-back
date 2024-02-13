import { Router } from "express"
import * as authController from "../controllers/auth-controller.js"

export const router = Router()

router.post('/register',authController.register)
router.post('/login',authController.login)