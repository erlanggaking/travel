import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tours = await prisma.tourPackage.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(tours);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tours" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const tour = await prisma.tourPackage.create({
      data: {
        title: body.title,
        location: body.location,
        duration: body.duration,
        price: body.price,
        imageUrl: body.imageUrl,
        tag: body.tag,
        quota: body.quota,
      },
    });
    return NextResponse.json(tour);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create tour" }, { status: 500 });
  }
}
