"use server";

interface AuthResult {
  success: boolean;
  id?: string;
  token?: string;
  error?: string;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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

    const response = await fetch(`${apiUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log(data);

    if (data.status === 400) {
      return {
        success: false,
        error: data.message,
      };
    }

    // (await cookies()).set({
    //   name: "chat_token",
    //   value: data.token,
    //   path: "/",
    //   httpOnly: false,
    //   secure: true,
    //   maxAge: 43200,
    //   sameSite: "none",
    // });
    return {
      success: true,
      token: data.token,
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
  try {
    //TODO validate input
    if (!userName || !email || !password) {
      return {
        success: false,
        error: "All fields are required",
      };
    }

    const response = await fetch(`${apiUrl}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, email, password }),
    });

    const data = await response.json();

    if (data.status >= 400) {
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
