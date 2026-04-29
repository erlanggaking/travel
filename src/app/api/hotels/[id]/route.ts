import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const hotel = await prisma.hotel.update({ where: { id }, data: body });
  return NextResponse.json(hotel);
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.hotel.delete({ where: { id } });
  return NextResponse.json({ message: "Deleted" });
}
