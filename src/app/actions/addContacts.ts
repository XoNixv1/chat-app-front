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

    // Here you would:
    // 1. Check if the user exists in your system
    // 2. Check if they're already a contact
    // 3. Add them to the user's contacts in your database

    // Simulate a delay for the API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For demo purposes, let's simulate a successful addition
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
