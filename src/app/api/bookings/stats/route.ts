import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const [totalBookings, paidBookings, pendingCount, cancelledCount, refundedCount, allPaid, allRefunded, customers, recentBookings, topProducts] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.count({ where: { status: "PAID" } }),
    prisma.booking.count({ where: { status: "PENDING" } }),
    prisma.booking.count({ where: { status: "CANCELLED" } }),
    prisma.booking.count({ where: { status: "REFUNDED" } }),
    prisma.booking.findMany({ where: { status: "PAID" }, select: { totalPrice: true, type: true, createdAt: true } }),
    prisma.booking.findMany({ where: { status: "REFUNDED" }, select: { totalPrice: true } }),
    prisma.user.count({ where: { role: "CUSTOMER" } }),
    prisma.booking.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.booking.groupBy({ by: ["productName"], _count: true, _sum: { totalPrice: true }, where: { status: "PAID" }, orderBy: { _count: { productName: "desc" } }, take: 5 }),
  ]);

  const totalRevenue = allPaid.reduce((sum, b) => sum + b.totalPrice, 0);
  const totalRefunds = allRefunded.reduce((sum, b) => sum + b.totalPrice, 0);

  // Revenue by type
  const revenueByType: Record<string, number> = {};
  allPaid.forEach(b => { revenueByType[b.type] = (revenueByType[b.type] || 0) + b.totalPrice; });

  // Revenue last 7 days
  const last7Days: { date: string; revenue: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const dayRevenue = allPaid.filter(b => b.createdAt.toISOString().split("T")[0] === dateStr).reduce((s, b) => s + b.totalPrice, 0);
    last7Days.push({ date: dateStr, revenue: dayRevenue });
  }

  return NextResponse.json({
    totalRevenue, totalRefunds, netIncome: totalRevenue - totalRefunds,
    totalBookings, paidBookings, pendingCount, cancelledCount, refundedCount,
    activeCustomers: customers, revenueByType, last7Days, recentBookings,
    topProducts: topProducts.map(p => ({ name: p.productName, count: p._count, revenue: p._sum.totalPrice })),
  });
}
