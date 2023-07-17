import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { client } from "@/utils/database";
import { response } from "@/app/api/post/route";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/services/crypto";

/**
 * 로그인
 * @param request
 * @returns
 */
export const POST = async (request: NextRequest) => {
  try {
    const payload = (await request.json()) as ISignInPayload;
    const { email, password } = payload;
    const db = client.db("reservation");
    const res = (await db.collection("members").findOne({ email })) as IMember;

    // 1. email로 조회했을 때 존재하지 않을 경우
    if (!res) throw new Error("사용자 계정이 존재하지 않습니다.");

    const originalText = decrypt(password);

    const isMatched = bcrypt.compareSync(originalText, res.password);

    // 2. email은 존재하나, password가 존재하지 않을 경우
    if (!isMatched) throw new Error("비밀번호가 유효하지 않습니다.");

    const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET_KET || "";
    const data = { userId: res._id };
    const accessToken = jwt.sign(data, secretKey, { expiresIn: "24h" });
    const refreshToken = jwt.sign(data, secretKey, { expiresIn: "48h" });

    db.collection("members").updateOne({ email }, { $set: { refreshToken } });

    const { password: _, ...user } = res;

    /**
     * token 발급
     * access token은 payload 로
     * refresh token은 cookie 로
     */

    const _response = response(
      "로그인에 성공 했습니다.",
      {
        refreshToken,
        accessToken,
        user,
        accessTokenExpiry: Date.now() + 60 * 60 * 1000,
      },
      true
    );

    // 여기서 refresh token도 같이 db에 저장해두고, 유효한지 확인해줘야함.

    return _response;
  } catch (error: any) {
    console.log("[ERROR]", error.message);
    return response(error.message || "로그인에 실패 했습니다.", null, false);
  }
};
