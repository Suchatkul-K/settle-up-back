import prisma from "../models/prisma.js";

export function addBillParticipants(data) {
  return prisma.participant.createMany({ data });
}

export function updateBillParticipantsByParticipantId(id, data) {
  return prisma.participant.update({ where: { id }, data })
}

export function getAllParticipantByBillId(billId) {
  return prisma.participant.findMany({ where: { billId } })
}

export function deleteManyParticipantById(id) {
  return prisma.participant.deleteMany({ where: {id: {in: id}}})
}