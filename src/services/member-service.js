import prisma from "../models/prisma.js";

export function createMember (data) { return prisma.member.create({ data })}