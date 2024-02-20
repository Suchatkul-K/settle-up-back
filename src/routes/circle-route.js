import { Router } from "express"
import authenticate from "../middlewares/authenticate.js"
import * as circleController from "../controllers/circle-controller.js"
import authenticateCircle from "../middlewares/authenticateCircle.js"

export const router = Router()

router.get('/:circleId', authenticate, circleController.getCircleData)
router.post('/:circleId/members', authenticateCircle, circleController.addCircleMember)
router.get('/:circleId/members', authenticateCircle, circleController.getAllCircleMember)