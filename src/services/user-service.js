import prisma from "../models/prisma.js";

export function createUser ({ data }) { return prisma.user.create({ data })}

export function getUserByEmail (email) { return prisma.user.findUnique({ where: { email }})}