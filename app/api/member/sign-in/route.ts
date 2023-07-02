import bcrypt from "bcrypt";
import { client } from "@/utils/database";
import { response } from "@/app/api/post/route";
import { NextRequest } from "next/server";
import { decrypt } from "@/services/crypto";

/**
 * 로그인
 * @param request
 * @returns
 */
export const POST = async (request: NextRequest) => {
  try {
    const payload = (await request.json()) as ISignInPayload;
    console.log(payload);
    const { email, password } = payload;
    const db = client.db("reservation");
    const res = (await db.collection("members").findOne({ email })) as IMember;

    // 1. email로 조회했을 때 존재하지 않을 경우
    if (!res) throw new Error("사용자 계정이 존재하지 않습니다.");

    const originalText = decrypt(password);

    console.log("decrypt -->", originalText);

    const isMatched = bcrypt.compareSync(originalText, res.password);

    // 그냥 암호화해서 전달하고 key 로 평문화하자

    // 2. email은 존재하나, password가 존재하지 않을 경우
    if (!isMatched) throw new Error("비밀번호가 유효하지 않습니다.");

    const { password: _, ..._res } = res;

    return response("로그인에 성공 했습니다.", _res, true);
  } catch (error: any) {
    return response(error.message || "로그인에 실패 했습니다.", null, false);
  }
};
