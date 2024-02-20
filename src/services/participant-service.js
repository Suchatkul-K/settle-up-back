import prisma from "../models/prisma.js";

export function addParticipant(data) {
  return prisma.participant.create({ data });
}