"use server";

type ContactResult = {
  success: boolean;
  error?: string;
};

export async function addContact(email: string): Promise<ContactResult> {
  try {
    // Validate email
    if (!email || !email.includes("@")) {
      return {
        success: false,
        error: "Please enter a valid email address",
      };
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error adding contact:", error);
    return {
      success: false,
      error: "Failed to add contact. Please try again.",
    };
  }
}
