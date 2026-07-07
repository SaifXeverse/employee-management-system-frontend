import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const adminToken = request.cookies.get("AccessToken")?.value;
  const employeeToken = request.cookies.get("AccessTokenEmployee")?.value;

  const { pathname } = request.nextUrl;

  if (pathname === "/login" && employeeToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (pathname.startsWith("/dashboard") && !employeeToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname === "/admin/login" && adminToken) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (pathname.startsWith("/admin/dashboard") && !adminToken) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/dashboard/:path*",
    "/admin/login",
    "/admin/dashboard/:path*",
  ],
};