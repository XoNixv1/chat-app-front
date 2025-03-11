import axios from "axios";

export async function deleteContact(id: string) {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/user/deleteContact",
      {
        id,
      }
    );
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    return `error: ${error}`;
  }
}
