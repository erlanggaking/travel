import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const promos = await prisma.promo.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(promos);
}

export async function POST(request: Request) {
  const body = await request.json();
  const promo = await prisma.promo.create({ data: body });
  return NextResponse.json(promo);
}
