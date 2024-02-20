import prisma from "../models/prisma.js";

export function createMember(data) {
  return prisma.member.create({ data });
}

// export function getAllMember (id) { return prisma.member.findMany({ where: {id:{in: id}}, include:{bots: true}}) }

export function getAllUserInCircle(circleId) {
  return prisma.member.findMany({
    where: {
      circleId,
      userId:{
        not: null
      }
    },
    select: {
      user: {
        select:{username: true}
      }
    },
  });
}

export function getAllMemberInCircle(circleId) {
  return prisma.member.findMany({
    where: {
      circleId,
      // userId:{
      //   not: null
      // }
    },
    select: {
      id: true,
      user: {
        select:{username: true}
      },
      bot: {select: {botName: true}}
    },
  });
}