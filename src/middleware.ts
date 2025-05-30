import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isTokenExpired } from "./utils/tokenExpiry";

const protectedRoutes = [
  "/dashboard",
  "/profile",
  "/services",
  "/transactions",
  "/payment-methods",
  "/activity",
];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("Authorization");
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute && (!token || isTokenExpired(token.value))) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.set("Authorization", "", { maxAge: 0 });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/services/:path*",
    "/transactions/:path*",
    "/payment-methods/:path*",
    "/activity/:path*",
  ],
};
