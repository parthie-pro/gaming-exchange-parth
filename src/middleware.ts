import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const userId = req.cookies.get("userId"); // Example: Retrieve userId from cookies or session
  if (!userId) {
    return NextResponse.redirect("/login");
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
}; 