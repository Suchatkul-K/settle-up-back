import { Router } from "express"
import * as authController from "../controllers/auth-controller.js"
import authenticate from "../middlewares/authenticate.js"

export const router = Router()

router.post('/register',authController.register)
router.post('/login',authController.login)
router.get('/me',authenticate, authController.getMe)