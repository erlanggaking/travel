import { PrismaClient } from "@prisma/client";
import path from "path";

// Di Vercel, kita perlu mendefinisikan path absolut agar file .db ditemukan
const dbPath = path.join(process.cwd(), "prisma", "dev.db");
const databaseUrl = `file:${dbPath}`;

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
