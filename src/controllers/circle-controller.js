import * as circleService from "../services/circle-service.js";
import * as jwtService from "../services/jwt-service.js"

export async function getCircleData (req,res,next) {
    try {
        const { circleId } = req.params
        const circleData = await circleService.getCircleDataByCircleId( +circleId )

        // jwt
        const payload = { userId : circleData.members[0].userId, circleId: circleData.id}
        console.log(payload);
        const accessToken = jwtService.sign(payload)

        res.status(200).json({accessToken, circleData})
    } catch (error) {
        console.log(error);
        next()
    }
}