import { prisma } from "../../lib/prisma";

export async function getProductReport(
  userId: string,
  isAdmin: boolean,
  startDate?: string,
  endDate?: string
) {
  return prisma.product.findMany({
    where: {
      ...(isAdmin ? {} : { createdById: userId }),
      ...(startDate && endDate
        ? {
            createdAt: {
              gte: new Date(startDate),
              lte: new Date(endDate),
            },
          }
        : {}),
    },
    include: {
      createdBy: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}
