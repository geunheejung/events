import crypto, { enc } from "crypto-js";
import fetchApi from "../fetchApi";
import { encrypt } from "../crypto";

export const signUp = async (payload: ISignUpPayload) => {
  const cipherText = encrypt(payload.password);

  const res = await fetchApi("/member/sign-up", {
    method: "POST",
    payload: { ...payload, password: cipherText },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch sign up");
  }

  const data = await res.json();

  return data;
};

export const signIn = async (payload: ISignInPayload) => {
  const cipherText = encrypt(payload.password);

  const res = await fetchApi("/member/sign-in", {
    method: "POST",
    payload: { ...payload, password: cipherText },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch sign in");
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
