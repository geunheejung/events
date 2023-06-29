/**
 * Signup
 * 1. email, password, username 을 입력으로 받는다
 * 2. 각 값들이 유효한지 체크한다
 * 3. 유효할 경우 응답을 반환한다
 */

import bcrypt from "bcrypt";
import { client } from "@/utils/database";
import { NextRequest } from "next/server";
import { response } from "@/app/api/post/route";

const saltRounds = 10;

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);

    const name = searchParams.get("name");
    const db = client.db("reservation");
    const collection = await db.collection("members");

    // 이름으로 조회할 경우 중복체크 여부로 판단하여 true, false만 제공해줌.
    if (name) {
      const data = await collection.findOne({ name });

      const isDuplicated = data ? true : false;

      return response("success", isDuplicated, true);
    }
  } catch (error: any) {
    return response("Failed Get Member", { message: error.message }, false);
  }
};

/**
 *
 * @param request
 */
export const POST = async (request: NextRequest) => {
  try {
    const payload = (await request.json()) as ISignUpPayload;
    const db = client.db("reservation");

    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(payload.password, salt, async (err, hash) => {
        const res = await db.collection("members").insertOne(payload);
      });
    });

    // 1. password 암호화

    return response("Success SignUp", {}, true);
  } catch (error: any) {
    return response("fail SignUp", {}, false);
  }
};
