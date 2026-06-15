const { PrismaClient, Role } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash(
    "Password@1",
    10
  );

  // ADMIN

  const admin = await prisma.user.upsert({
    where: {
      email: "admin@test.com",
    },
    update: {},
    create: {
      name: "System Administrator User",
      email: "admin@test.com",
      password: hashedPassword,
      address: "Pune Maharashtra India",
      role: Role.ADMIN,
    },
  });

  // STORE OWNER

  const owner = await prisma.user.upsert({
    where: {
      email: "owner@test.com",
    },
    update: {},
    create: {
      name: "Store Owner User Example",
      email: "owner@test.com",
      password: hashedPassword,
      address: "Pune Maharashtra",
      role: Role.STORE_OWNER,
    },
  });

  // USER

  const user = await prisma.user.upsert({
    where: {
      email: "user@test.com",
    },
    update: {},
    create: {
      name: "Normal User Example Account",
      email: "user@test.com",
      password: hashedPassword,
      address: "Mumbai Maharashtra India",
      role: Role.USER,
    },
  });

  // STORE 1

  const store1 = await prisma.store.upsert({
    where: {
      email: "store@test.com",
    },
    update: {},
    create: {
      name: "Tech Store Pune",
      email: "store@test.com",
      address: "Pune Maharashtra",
      ownerId: owner.id,
    },
  });

  // STORE 2

  const store2 = await prisma.store.upsert({
    where: {
      email: "toy@test.com",
    },
    update: {},
    create: {
      name: "Toy Store Pune Camp",
      email: "toy@test.com",
      address: "Camp Pune Maharashtra",
      ownerId: owner.id,
    },
  });

  // RATINGS

  await prisma.rating.upsert({
    where: {
      userId_storeId: {
        userId: user.id,
        storeId: store1.id,
      },
    },
    update: {},
    create: {
      userId: user.id,
      storeId: store1.id,
      rating: 5,
    },
  });

  await prisma.rating.upsert({
    where: {
      userId_storeId: {
        userId: user.id,
        storeId: store2.id,
      },
    },
    update: {},
    create: {
      userId: user.id,
      storeId: store2.id,
      rating: 4,
    },
  });

  console.log("Seed completed successfully");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });