const url = `http://localhost:3000/api/member`;

export const signup = async (payload: ISignUpPayload) => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch set data");
  }

  return res;
};

export const checkDuplicateName = async (
  payload: ICheckDuplicateNamePayload
) => {
  const res = await fetch(`${url}?name=${payload.name}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch check duplicate name");
  }

  const { data } = await res.json();

  return data as boolean;
};
