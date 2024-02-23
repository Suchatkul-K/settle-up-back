import { Router } from "express"
import authenticate from "../middlewares/authenticate.js"
import * as circleController from "../controllers/circle-controller.js"
import * as billController from "../controllers/bill-controller.js"
import authenticateCircle from "../middlewares/authenticateCircle.js"

export const router = Router()

router.get('/:circleId', authenticate, circleController.getCircleData)
router.post('/:circleId/members', authenticateCircle, circleController.addCircleMember)
router.get('/:circleId/members', authenticateCircle, circleController.getAllCircleMember)
router.post('/:circleId/bills', authenticateCircle, billController.createBill)
router.get('/:circleId/bills', authenticateCircle, billController.getAllBill)
router.delete('/:circleId/members/:memberId', authenticateCircle, circleController.deleteMemberById)
router.patch('/:circleId/members/:memberId', authenticateCircle, circleController.updateBotByMemberId)
router.patch('/:circleId/bills/:billId', authenticateCircle, billController.updateBill)
router.delete('/:circleId/bills/:billId', authenticateCircle, billController.deleteBill)