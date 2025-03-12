"use server";

import useHttp from "@/hooks/useHttp";
import { cookies } from "next/headers";

type AuthResult = {
  success: boolean;
  error?: string;
  message?: string;
  id?: number;
};

export async function login(
  email: string,
  password: string
): Promise<AuthResult> {
  const { request } = useHttp();
  try {
    //TODO validate input
    if (!email || !password) {
      return {
        success: false,
        error: "Email and password are required",
      };
    }

    // login request
    const data = await request(
      "https://chat-app-server-production-1070.up.railway.app:3123/api/auth/login",
      "POST",
      "include",
      undefined,
      {
        email,
        password,
      }
    );

    if (data.status === 400) {
      return {
        success: false,
        error: data.message,
      };
    }
    console.log(data);
    // seting cookie here cuz it was not working from server
    (await cookies()).set({
      name: "chat_token",
      value: data.token,
      path: "/",
      httpOnly: false,
      secure: true,
      maxAge: 43200,
      sameSite: "none",
    });
    return {
      success: true,
      id: data.id,
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
  const { request } = useHttp();
  try {
    //TODO validate input
    if (!userName || !email || !password) {
      return {
        success: false,
        error: "All fields are required",
      };
    }
    const data = await request(
      "https://chat-app-server-production-1070.up.railway.app:3123/api/auth/register",
      "POST",
      undefined,
      undefined,
      {
        userName,
        email,
        password,
      }
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
