import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const warmupPrisma = async () => {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  try {
    await global.prisma.$queryRaw`SELECT 1`;
  } catch (e) {
    console.error("Failed to warm up Prisma Client:", e);
  }
};
