import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const settings = await prisma.setting.findMany();
  const result: Record<string, string> = {};
  settings.forEach(s => { result[s.key] = s.value; });
  return NextResponse.json(result);
}

export async function PUT(request: Request) {
  const body = await request.json();
  for (const [key, value] of Object.entries(body)) {
    await prisma.setting.upsert({
      where: { key },
      update: { value: String(value) },
      create: { key, value: String(value) },
    });
  }
  return NextResponse.json({ message: "Settings saved" });
}
