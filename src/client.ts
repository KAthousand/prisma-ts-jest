import { PrismaClient } from "@prisma/client";

// add prisma to the NodeJS global type
declare module NodeJS{
  interface Global{
    spotConfig: any
  }
}
interface CustomNodeJsGlobal extends NodeJS.Global {
  prisma: PrismaClient;
}

// Prevent multiple instances of Prisma Client in development
declare const global: CustomNodeJsGlobal;

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "test") global.prisma = prisma;

export default prisma;