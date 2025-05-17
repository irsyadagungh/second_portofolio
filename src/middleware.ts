import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("adminAuth");

  const { pathname } = request.nextUrl;

  // Jangan blokir halaman login (/admin)
  if (pathname === "/admin") {
    return NextResponse.next();
  }

  // Blokir semua /admin/* jika belum login
  if (!token && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
