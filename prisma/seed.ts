import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg';


const connectionString = `${process.env.DATABASE_URL}`
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

async function main() {
  const adminPassword = await bcrypt.hash("admin123", 10);
  const userPassword = await bcrypt.hash("user123", 10);

  const admin = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@example.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  const user1 = await prisma.user.create({
    data: {
      name: "User One",
      email: "user1@example.com",
      password: userPassword,
      role: "USER",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "User Two",
      email: "user2@example.com",
      password: userPassword,
      role: "USER",
    },
  });

  const products = [];

  for (let i = 1; i <= 10; i++) {
    products.push(
      prisma.product.create({
        data: {
          name: `Product ${i}`,
          price: i * 10000,
          description: `Description for product ${i}`,
          createdById: i % 2 === 0 ? user1.id : user2.id,
        },
      })
    );
  }

  await Promise.all(products);

  console.log("Seeder completed successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
