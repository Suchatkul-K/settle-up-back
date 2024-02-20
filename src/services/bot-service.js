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
