import crypto, { enc } from "crypto-js";
import fetchApi from "../fetchApi";
import { encrypt } from "../crypto";
import { JWT } from "next-auth/jwt";

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

  const res = await fetchApi("/api/member/sign-in", {
    method: "POST",
    payload: { ...payload, password: cipherText },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch sign in");
  }

  // 여기 data에는 token도 같이 담겨져서 내려와야함.
  const data = (await res.json()) as IResponse<ISignInResponse>;

  return data;
};

export const refreshAccessToken = async (token: JWT) => {
  try {
    const res = await fetchApi("/api/member/refresh-token", {
      method: "POST",
      payload: { token },
    });

    console.log("res ->", res);

    return token;
  } catch (error: any) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
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

export const getUser = async () => {
  return { name: "tom" };
};
