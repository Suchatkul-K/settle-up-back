import * as circleService from "../services/circle-service.js";
import * as memberService from "../services/member-service.js";
import * as userService from "../services/user-service.js";
import catchError from "../utils/catch-error.js";
import createError from "../utils/create-error.js";

export async function createCircle(req, res, next) {
  // catchError()
  if (!req.body.circleName) {
    createError("Circle name required", 400);
  }

  try {
    const data = { circleName: req.body.circleName };
    const newCircle = await circleService.createCircle(data);
    // console.log(newCircle);

    if (!newCircle) {
      next();
    }

    const newMember = await memberService.createMember({
      userId: req.user.id,
      circleId: newCircle.id,
    });
    console.log(newMember);
    res.status(201).json({ message: "circle created" });
  } catch (error) {
    console.log(error);
    next();
  }
}

export async function getAllCircleByUserId(req, res, next) {
  try {
    const ownCircle = await userService.getAllOwnCircle(req.user.id);
    // console.log(result);

    const ownCirclesId = ownCircle.members.map((el) => el.circleId);
    // console.log(ownCirclesId);

    const circles = await circleService.getAllCircle(ownCirclesId);
    // console.log(circles);
    res.status(200).json({ circles });
  } catch (error) {
    console.log(error);
    next();
  }
}

export async function updateCircleNameByCircleId(req,res,next) {
    try {
        console.log(req.body);
        const {id, data} = req.body
        const result = await circleService.updateCircleById(id, data)
        console.log(result);
        res.status(200).json({ message: "edit" });
    } catch (error) {
        console.log(error);
        next();
    }
}