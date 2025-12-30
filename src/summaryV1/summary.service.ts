import { prisma } from "../../lib/prisma";

export async function productPerDay(userId?: string, isAdmin = false) {
  return prisma.$queryRawUnsafe<
    { date: string; total: number }[]
  >(
    `
    SELECT 
      DATE("createdAt") as date,
      COUNT(*)::int as total
    FROM products
    ${isAdmin ? "" : 'WHERE "createdById" = $1'}
    GROUP BY DATE("createdAt")
    ORDER BY date ASC
    `,
    ...(isAdmin ? [] : [userId])
  );
}

export async function productPerUser() {
  return prisma.product.groupBy({
    by: ["createdById"],
    _count: { id: true },
  });
}

export async function productByRole() {
  return prisma.$queryRawUnsafe<
    { role: string; total: number }[]
  >(
    `
    SELECT u.role, COUNT(p.id)::int as total
    FROM users u
    JOIN products p ON p."createdById" = u.id
    GROUP BY u.role
    `
  );
}