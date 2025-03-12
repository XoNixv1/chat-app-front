import axios from "axios";

export async function deleteContact(id: string) {
  try {
    const response = await axios.post(
      "https://chat-app-server-production-04bc.up.railway.app/api/user/deleteContact",
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
