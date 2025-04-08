import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/libs/auth-middleware";

const protectedRoutes = ["/dashboard", "/api"];
const publicRoutes = ["/auth/login", "/auth/register", "/"];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );
  const isPublicRoute = publicRoutes.includes(path);

  const headerSession = req.headers.get("X-User-Session");
  const cookieSession = req.cookies.get("session")?.value;
  const session = headerSession || cookieSession;
  const payload = await verifyAuth(session);

  if (isProtectedRoute && !payload) {
    if (path.startsWith("/api")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (isPublicRoute && payload) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  // Match all routes except for static files and images
  matcher: ["/((?!_next/static|_next/image|.*\\.png$).*)"],
  //matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"], // Match all routes except for api routes and static files
};
