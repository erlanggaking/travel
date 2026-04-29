import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const customers = await prisma.user.findMany({
    where: { role: "CUSTOMER" },
    include: { bookings: { select: { totalPrice: true, status: true, createdAt: true, type: true, productName: true } } },
    orderBy: { createdAt: "desc" },
  });
  const result = customers.map(c => ({
    ...c,
    totalOrders: c.bookings.length,
    totalSpent: c.bookings.filter(b => b.status === "PAID").reduce((s, b) => s + b.totalPrice, 0),
  }));
  return NextResponse.json(result);
}
