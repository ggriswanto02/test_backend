import { prisma } from "../../lib/prisma";

export function createProduct(data: {
  name: string;
  price: number;
  description?: string;
  userId: string;
}) {
  return prisma.product.create({
    data: {
      name: data.name,
      price: data.price,
      description: data.description,
      createdById: data.userId,
    },
  });
}

export function getProducts(userId?: string, isAdmin = false) {
  return prisma.product.findMany({
    where: isAdmin ? {} : { createdById: userId },
    // include: { createdBy: true },
  });
}

export function getProductById(id: string) {
  return prisma.product.findUnique({
    where: { id },
    // include: { createdBy: true },
  });
}

export function updateProduct(
  id: string,
  userId: string,
  isAdmin: boolean,
  data: any
) {
  return prisma.product.updateMany({
    where: isAdmin ? { id } : { id, createdById: userId },
    data,
  });
}

export function deleteProduct(
  id: string,
  userId: string,
  isAdmin: boolean
) {
  return prisma.product.deleteMany({
    where: isAdmin ? { id } : { id, createdById: userId },
  });
}

