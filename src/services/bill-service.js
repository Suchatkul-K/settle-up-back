import prisma from "../models/prisma.js";

export function createBill(data) {
  return prisma.bill.create({ data });
}