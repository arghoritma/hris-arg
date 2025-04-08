import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello World" });
}

export async function POST(request: Request) {
  const data = await request.json();
  return NextResponse.json({ data });
}

export async function PUT(request: Request) {
  const data = await request.json();
  return NextResponse.json({ message: "Updated successfully", data });
}

export async function DELETE() {
  return NextResponse.json({ message: "Deleted successfully" });
}
