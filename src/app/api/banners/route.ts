import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const banners = await prisma.banner.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(banners);
}

export async function POST(request: Request) {
  const body = await request.json();
  const banner = await prisma.banner.create({ data: body });
  return NextResponse.json(banner);
}
