import { TOKEN, BASE_URL } from "@/config";

export async function get(
  endpoint: string,
  queryParams: Record<string, string | number> = {},
) {
  try {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    Object.entries(queryParams).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });

    url.searchParams.append("token", String(TOKEN));

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return { error: `HTTP error! Status: ${response.status}` };
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: "An error occurred while fetching data." };
  }
}

const api = {
  get,
};

export default api;
