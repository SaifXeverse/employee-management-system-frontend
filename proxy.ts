import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const adminToken = request.cookies.get("AccessToken")?.value;
  const employeeToken = request.cookies.get("AccessTokenEmployee")?.value;

  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/login") && employeeToken) {
    return NextResponse.redirect((new URL("/dashboard", request.url)));
  }

  if (
    (pathname.startsWith("/dashboard") || pathname.startsWith("/profile")) &&
    !employeeToken
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/admin/login") && adminToken) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (
    (pathname.startsWith("/admin/dashboard") ||
      pathname.startsWith("/admin/employees") ||
      pathname.startsWith("/admin/permission") ||
      pathname.startsWith("/admin/profile")) &&
    !adminToken
  ) {
    return NextResponse.redirect (new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/dashboard/:path*",
    "/profile/:path*",
    "/admin/login",
    "/admin/dashboard/:path*",
    "/admin/employees/:path*",
    "/admin/permission/:path*",
    "/admin/profile/:path*",
  ],
};
