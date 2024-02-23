import prisma from "../models/prisma.js";

export function createBill(data) {
  return prisma.bill.create({ data });
}

export function getAllBillByCycleId(circleId) {
  return prisma.bill.findMany({where: { circleId }, include: {participant : {include: {member: {include:{bot: true,user: true}}}}}})
}

export function updateBillByBillId(id, data) {
  return prisma.bill.update({where: { id }, data})
}

export function deleteBillByBillId(id) {
  return prisma.bill.delete({ where: { id }})
}