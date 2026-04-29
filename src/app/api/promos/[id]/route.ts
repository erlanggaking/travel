import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const promo = await prisma.promo.update({ where: { id }, data: body });
  return NextResponse.json(promo);
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.promo.delete({ where: { id } });
  return NextResponse.json({ message: "Deleted" });
}
