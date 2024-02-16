import { Router } from "express"
import authenticate from "../middlewares/authenticate.js"
import * as circleController from "../controllers/circle-controller.js"

export const router = Router()

router.get('/:circleId', authenticate, circleController.getCircleData)