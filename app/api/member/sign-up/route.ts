import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { client } from "@/utils/database";
import { Member } from "@/services/model";
import { response } from "@/app/api/post/route";
import { decrypt } from "@/services/crypto";

/**
 * @param request
 */
export const POST = async (request: NextRequest) => {
  try {
    const payload = (await request.json()) as ISignUpPayload;
    const db = client.db("reservation");

    const originalText = decrypt(payload.password);

    console.log("originalText -->", originalText);

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(originalText, salt);
    const member = new Member({
      ...payload,
      password: hash,
    });

    const res = await db.collection("members").insertOne(member);

    return response("Success SignUp", {}, true);
  } catch (error: any) {
    return response("fail SignUp", {}, false);
  }
};
