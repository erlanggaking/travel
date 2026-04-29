import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const flights = await prisma.flight.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(flights);
}

export async function POST(request: Request) {
  const body = await request.json();
  const flight = await prisma.flight.create({ data: { ...body, departureTime: new Date(body.departureTime), arrivalTime: new Date(body.arrivalTime) } });
  return NextResponse.json(flight);
}
