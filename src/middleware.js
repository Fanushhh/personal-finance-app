import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./app/lib/session";
import { isSessionExpiring, updateSession } from "./app/lib/session";

const publicRoute = [ "/login", "/sign-up"];
const protectedRoute = ["/profile"];

export default async function middleware(req) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoute.includes(path);
  const isPublicRoute = publicRoute.includes(path);

  const cookie = (await cookies())?.get("session")?.value;

  const session = await decrypt(cookie);
  const isSessionExpiringSoon = await isSessionExpiring(session?.expiresAt, 1440);
  
  if (isSessionExpiringSoon) {
    await updateSession();
    return NextResponse.next();
  }
  if (path === "/" && session?.userId) {
    return NextResponse.next(); // Allow access to "/" for authenticated users
  }
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
