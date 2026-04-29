import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const hotels = await prisma.hotel.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(hotels);
}

export async function POST(request: Request) {
  const body = await request.json();
  const hotel = await prisma.hotel.create({ data: body });
  return NextResponse.json(hotel);
}
