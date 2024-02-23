import prisma from "../models/prisma.js";

export function addBot(data) {
  return prisma.bot.create({ data });
}

export function getAllBotInCircle(circleId) {
  return prisma.bot.findMany({
    where: {
      member: {
        circleId,
      },
    },
    // include: {
    //   member: true // Include the related member data
    // }
  });
}

export function deleteBotByMemberId(memberId) {
  return prisma.bot.delete({
    where: {
      memberId,
    },
  })
}

export function updateBotNamebyMemberId(memberId,data) {
  return prisma.bot.update({
    where : {
      memberId,
    },
    data
  })
}

export function getBotByMemberId(memberId) {
  return prisma.bot.findUnique({
    where : {
      memberId
    }
  })
}