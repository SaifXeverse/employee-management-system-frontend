import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const adminToken = request.cookies.get("AccessToken")?.value;
  const employeeToken = request.cookies.get("AccessTokenEmployee")?.value;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && employeeToken && !adminToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const isEmployeeRoute =
    pathname.startsWith("/dashboard") || pathname.startsWith("/profile");

  const isEmployeeAuthRoute =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  const isEmployeeAllRoute =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/profile");

  if (adminToken && !employeeToken && isEmployeeAllRoute) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (isEmployeeAuthRoute && employeeToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isEmployeeRoute && !employeeToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/admin/login") && adminToken) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  const isAdminProtectedRoute =
    pathname.startsWith("/admin/dashboard") ||
    pathname.startsWith("/admin/employees") ||
    pathname.startsWith("/admin/permission") ||
    pathname.startsWith("/admin/profile");

  if (isAdminProtectedRoute && !adminToken) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/dashboard/:path*",
    "/profile/:path*",
    "/admin/:path*",
  ],
};
