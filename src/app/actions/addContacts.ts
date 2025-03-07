import axios from "axios";

export async function addContact(user1_id: string | null, email: string) {
  try {
    if (!email || !email.includes("@")) {
      return {
        success: false,
        error: "Please enter a valid email address",
      };
    }
    const response = await axios.post(
      "http://localhost:3001/api/user/addUser",
      {
        user1_id: "91e281fd-74b7-40a3-86c2-f9ce4628d2b3",
        email: "test1@example.com",
      }
    );
    return {
      data: response.data.newChat,
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
