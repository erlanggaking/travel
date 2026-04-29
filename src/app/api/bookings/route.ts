import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const search = searchParams.get("search");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const where: any = {};
  if (status && status !== "ALL") where.status = status;
  if (search) {
    where.OR = [
      { customerName: { contains: search } },
      { customerEmail: { contains: search } },
      { id: { contains: search } },
      { productName: { contains: search } },
    ];
  }

  const [bookings, total] = await Promise.all([
    prisma.booking.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: { user: { select: { name: true, email: true } } },
    }),
    prisma.booking.count({ where }),
  ]);

  return NextResponse.json({ data: bookings, total, page, totalPages: Math.ceil(total / limit) });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const booking = await prisma.booking.create({ data: body });
    return NextResponse.json(booking);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
