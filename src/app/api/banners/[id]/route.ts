import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const banner = await prisma.banner.update({ where: { id }, data: body });
  return NextResponse.json(banner);
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.banner.delete({ where: { id } });
  return NextResponse.json({ message: "Deleted" });
}
