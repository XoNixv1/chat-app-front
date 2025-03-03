"use server";

import useHttp from "@/hooks/useHttp";
import { cookies } from "next/headers";

const { request } = useHttp();

type AuthResult = {
  success: boolean;
  error?: string;
  message?: string;
};

export async function login(
  email: string,
  password: string
): Promise<AuthResult> {
  try {
    //TODO validate input
    if (!email || !password) {
      return {
        success: false,
        error: "Email and password are required",
      };
    }

    const data = await request(
      "http://localhost:3001/auth/login",
      "POST",
      "include",
      undefined,
      { email, password }
    );
    console.log(data);
    if (data.status === 400) {
      return {
        success: false,
        error: data.message,
      };
    }

    (await cookies()).set({
      name: "token",
      value: data.token,
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600,
      sameSite: "lax",
    });
    return {
      success: true,
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      error: "Invalid credentials",
    };
  }
}

export async function register(
  userName: string,
  email: string,
  password: string
): Promise<AuthResult> {
  try {
    //TODO validate input
    if (!userName || !email || !password) {
      return {
        success: false,
        error: "All fields are required",
      };
    }
    const data = await request(
      "http://localhost:3001/auth/register",
      "POST",
      undefined,
      { userName, email, password }
    );

    if (data.status === 409) {
      return {
        success: false,
        error: data.message,
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      error: "Registration failed",
    };
  }
}
