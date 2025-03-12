import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
const { verify } = jwt;

const secretKey = process.env.JWT_SECRET_KEY;

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("chat_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // @ts-ignore
    const decoded = verify(token, secretKey);

    const response = NextResponse.next();
    response.headers.set("user-id", decoded.userId);
    return response;
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// covered routes
export const config = {
  matcher: ["/api/protected", "/protected", "/"],
};
