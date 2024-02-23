import * as circleService from "../services/circle-service.js";
import * as jwtService from "../services/jwt-service.js";
import * as memberService from "../services/member-service.js";
import * as botService from "../services/bot-service.js";
import * as constanc from "../utils/constanc.js";
import createError from "../utils/create-error.js";

export async function getCircleData(req, res, next) {
  try {
    const { circleId } = req.params;
    const circleData = await circleService.getCircleDataByCircleId(+circleId);

    // jwt
    const payload = {
      userId: circleData.members[0].userId,
      circleId: circleData.id,
    };
    // console.log(payload);
    const accessToken = jwtService.sign(payload);

    res.status(200).json({ accessToken, circleData });
  } catch (error) {
    console.log(error);
    next();
  }
}

export async function addCircleMember(req, res, next) {
  try {
    if(!req.body.botName) {
        createError("Member name required",400)
    }

    // console.log(req.circle);
    const newMember = await memberService.createMember({
      circleId: req.circle.id,
      role: constanc.ROLE.GUEST,
    });
    // console.log(newMember);
    // console.log(req.body);

    const Bot = await botService.addBot({
      memberId: newMember.id,
      botName: req.body.botName,
    });
    // console.log("Bot", Bot);

    res.status(200).json({ Bot });
  } catch (error) {
    console.log(error);
    next();
  }
}

export async function getAllCircleMember(req, res, next) {
  try {
    // const bot = await botService.getAllBotInCircle(req.circle.id)
    // console.log(result);

    // const user = await memberService.getAllUserInCircle(req.circle.id)
    // console.log(result2);

    const result = await memberService.getAllMemberInCircle(req.circle.id);
    // console.log(result);
    const members = result.map((memberObj) => {
      let id = memberObj.id;
      let name = memberObj.user
      ? memberObj.user.username 
      : memberObj.bot.botName 
      
      return { id, name, role: memberObj.role }
    });

    res.status(200).json({ message: "all circle member", members });
  } catch (error) {
    console.log(error);
    next();
  }
}

export async function deleteMemberById(req,res,next) {
  try {
    console.log(req.params, "request params");
    const { memberId } = req.params

    const existMember = await memberService.getMemberByMemberId(+memberId)
    // console.log(existMember);

    if(!existMember) {
      return res.status(400).json({message: "Member not found"})
    }
    
    // check if a bot
    if(!existMember.userId) {
      const deletedBot = await botService.deleteBotByMemberId(+memberId)
      console.log(deletedBot);
    }

    const deleteMember = await memberService.deleteMemberByMemberId(+memberId)
    console.log(deleteMember);

    res.status(200).json({message: "Delete member by id"})
  } catch (error) {
    console.log(error);
    next();
  }
}

export async function updateBotByMemberId(req,res,next) {
  try {
    // console.log(req.params, "request params");
    const { memberId } = req.params
    const { botName } = req.body
    // console.log(req.body,"request bodyyyyy");
    if(!botName) {
      return res.status(400).json({message: "Invalid: new name required"})
    }

    const existBotMember = await botService.getBotByMemberId((+memberId))
    // console.log(existBotMember);
    if(!existBotMember) {
      return res.status(400).json({message: "Update target is not a bot member"})
    }

    if(existBotMember.botName == botName) {
      return res.status(400).json({message: "Invalid: no change detected"})
    }

    const member = await botService.updateBotNamebyMemberId((+memberId), req.body)
    console.log(member);

    res.status(200).json({message: "Update member by id", member})
  } catch (error) {
    console.log(error);
    next();
  }
}
