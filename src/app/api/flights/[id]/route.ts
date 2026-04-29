import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const flight = await prisma.flight.update({ where: { id }, data: { ...body, departureTime: body.departureTime ? new Date(body.departureTime) : undefined, arrivalTime: body.arrivalTime ? new Date(body.arrivalTime) : undefined } });
  return NextResponse.json(flight);
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.flight.delete({ where: { id } });
  return NextResponse.json({ message: "Deleted" });
}
