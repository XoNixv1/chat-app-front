import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  //public paths
  const isPublicPath = path === "/login" || path === "/register";

  const token = request.cookies.get("chat_token")?.value || "";

  let isValidToken = false;

  if (token) {
    try {
      const response = await fetch(
        "https://chat-app-server-production-1070.up.railway.app:3123/api/auth/varify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Validation response status:", response.status);

      if (response.status === 200) {
        isValidToken = true;
      }
    } catch (error) {
      console.error("Token validation failed", error);
    }
  }

  //redirects

  if (isPublicPath && isValidToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isPublicPath && !isValidToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// covered routes
export const config = {
  matcher: ["/", "/login", "/register"],
};
