import bcrypt from "bcrypt";
import { client } from "@/utils/database";
import { NextRequest } from "next/server";
import { response } from "@/app/api/post/route";
import { Member } from "@/services/model";

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);

    const name = searchParams.get("name");
    const db = client.db("reservation");
    const collection = await db.collection("members");

    // 이름으로 조회할 경우 중복체크 여부로 판단하여 true, false만 제공해줌.
    if (name) {
      const data = await collection.findOne({ username: name });

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
    const { email, password, username } = payload;
    const db = client.db("reservation");

    await bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(payload.password, salt, function (err, hash) {
        payload.password = hash;
      });
    });

    const member = new Member(payload);

    const res = await db.collection("members").insertOne(member);

    console.log("payload ->", payload);

    return response("Success SignUp", {}, true);
  } catch (error: any) {
    return response("fail SignUp", {}, false);
  }
};
