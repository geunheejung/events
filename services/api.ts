const url = `http://localhost:3000/api`;

export const getList = async () => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { ok } = res;

  if (!ok) throw new Error("Failed getList");

  const data = (await res.json()) as IEventResponse;

  return data;
};

export const getItem = async (payload: { id: string }) => {
  const res = await fetch(`${url}?id=${payload.id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("Failed getItem");

  const { data } = (await res.json()) as IEventResponse;

  return data[0];
};

export const setItem = async (payload: Pick<IEvent, "title" | "content">) => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};
