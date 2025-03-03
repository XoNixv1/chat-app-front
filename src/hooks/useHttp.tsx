export default function useHttp() {
  const request = async (
    url: string,
    method = "GET",
    credentials: RequestCredentials = "include",
    headers: HeadersInit = { "Content-Type": "application/json" },
    body?: any
  ) => {
    try {
      const response = await fetch(url, {
        method,
        credentials,
        headers,
        body: body ? JSON.stringify(body) : null,
      });

      if (response.status === 400 || response.status === 409) {
        const errorData = await response.json();

        return {
          status: response.status,
          message: errorData.message || "Invalid credentials",
        };
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw error;
    }
  };

  return {
    request,
  };
}
