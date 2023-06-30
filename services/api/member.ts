import fetchApi from "../fetchApi";

export const signUp = async (payload: ISignUpPayload) => {
  const res = await fetchApi("/member", { method: "POST", payload });

  if (!res.ok) {
    throw new Error("Failed to fetch set data");
  }

  const data = await res.json();

  return data;
};

export const checkDuplicateName = async (
  payload: ICheckDuplicateNamePayload
) => {
  const res = await fetchApi(`/member?name=${payload.name}`, {
    headers: { cache: "no-cache" },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch check duplicate name");
  }

  const { data } = await res.json();

  return data as boolean;
};
