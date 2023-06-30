import fetchApi from "@/services/fetchApi";

export const getList = async () => {
  const res = await fetchApi("/post", { headers: { cache: "no-cache" } });

  if (!res.ok) {
    throw new Error("Failed to fetch data list");
  }

  const data = (await res.json()) as IEventResponse;

  return data;
};

export const getItem = async (payload: { id: string }) => {
  const res = await fetchApi(`/post?id=${payload.id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data item");
  }

  const { data } = await res.json();

  return data as IEvent;
};
export const getItemByKeyword = async (payload: { keyword: string }) => {
  const res = await fetchApi(`/post?keyword=${payload.keyword}`);

  if (!res.ok) {
    throw new Error("Failed to fetch search item");
  }

  const { data } = await res.json();

  return data as IEvent[];
};

export const setItem = async (payload: EventPayloadType) => {
  const res = await fetchApi("/post", { method: "POST", payload });

  if (!res.ok) {
    throw new Error("Failed to fetch set data");
  }

  return res;
};

export const updateItem = async (payload: EventPayloadType) => {
  const res = await fetchApi("/post", { method: "PUT", payload });

  if (!res.ok) {
    throw new Error("Failed to fetch update data");
  }

  return res;
};
