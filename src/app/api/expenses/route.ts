import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const expenses = await prisma.expense.findMany({ orderBy: { date: "desc" } });
  return NextResponse.json(expenses);
}

export async function POST(request: Request) {
  const body = await request.json();
  const expense = await prisma.expense.create({ data: { ...body, date: body.date ? new Date(body.date) : new Date() } });
  return NextResponse.json(expense);
}
