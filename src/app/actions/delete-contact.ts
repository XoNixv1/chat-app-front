import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function deleteContact(id: string) {
  try {
    const response = await axios.post(`${apiUrl}/api/user/deleteContact`, {
      id,
    });
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    return `error: ${error}`;
  }
}
