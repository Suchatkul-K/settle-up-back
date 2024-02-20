import prisma from "../models/prisma.js";

export function createCircle (data) { return prisma.circle.create({ data })}

export function getAllCircle (circles) { return prisma.circle.findMany({where: {id : {in: circles}}})}

export function updateCircleById (id,data) { return prisma.circle.update({ where: {id}, data})}

export function getCircleDataByCircleId (id) { return prisma.circle.findUnique({where:{id}, include: {bills: true, members: true}})} 