import { NextResponse } from "next/server";
import { verifySession } from "@/libs/dal";

export async function GET() {
  try {
    const { isAuth, userId } = await verifySession();

    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      userId: userId,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error :" + error },
      { status: 500 }
    );
  }
}
