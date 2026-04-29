import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const tour = await prisma.tourPackage.update({
      where: { id },
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
    return NextResponse.json({ error: "Failed to update tour" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await prisma.tourPackage.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Tour deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete tour" }, { status: 500 });
  }
}
