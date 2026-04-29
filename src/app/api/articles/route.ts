import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const articles = await prisma.article.findMany({ orderBy: { createdAt: "desc" }, include: { author: { select: { name: true } } } });
  return NextResponse.json(articles);
}

export async function POST(request: Request) {
  const body = await request.json();
  const article = await prisma.article.create({ data: body });
  return NextResponse.json(article);
}
