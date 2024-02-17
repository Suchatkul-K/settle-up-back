import { Router } from "express"
import authenticate from "../middlewares/authenticate.js"
import * as userController from "../controllers/user-controller.js"

export const router = Router()

router.post('/create', authenticate, userController.createCircle)
router.get('/circles', authenticate, userController.getAllCircleByUserId)
router.patch('/circles', authenticate, userController.updateCircleNameByCircleId)
router.patch('/me', authenticate, userController.updateUser)