const fetchApi = async <T>(
  url: string,
  config?: {
    payload?: T;
    method?: "GET" | "POST" | "PUT";
    headers?: HeadersInit;
  }
) => {
  const host = process.env.NEXT_PUBLIC_API_URL || "";
  const URL = `${host}${url}`;

  const fetchConfig: RequestInit = {
    method: config?.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...config?.headers,
    },
  };

  if (config?.payload) {
    fetchConfig.body = JSON.stringify(config.payload);
  }

  const res = await fetch(URL, fetchConfig);

  // const data = await res.json();

  return res;
};

export default fetchApi;
