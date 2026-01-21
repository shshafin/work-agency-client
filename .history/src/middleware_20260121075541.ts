import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  // ১. ড্যাশবোর্ড প্রোটেকশন: টোকেন ছাড়া ড্যাশবোর্ডে ঢুকতে বাধা
  if (pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ২. রিডাইরেক্ট লগড-ইন ইউজার: লগইন করা থাকলে লগইন পেজে ঢুকতে বাধা
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
