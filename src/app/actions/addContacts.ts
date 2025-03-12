import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function addContact(user1_id: string | null, email: string) {
  if (!user1_id) return;
  try {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return {
        success: false,
        error: "Please enter a valid email address",
      };
    }
    const response = await axios.post(`${apiUrl}/api/user/addUser`, {
      user1_id: user1_id,
      email: email,
    });
    return {
      data: response.data.newChat,
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: "An error occurred. Please try again later.",
    };
  }
}
