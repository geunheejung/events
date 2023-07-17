import { JWT } from "next-auth/jwt";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { client } from "@/utils/database";
import { ObjectId } from "mongodb";
import { response } from "../../post/route";

interface IToken extends JWT {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiry: number;
}

export const POST = async (request: NextRequest) => {
  try {
    const payload = (await request.json()) as { token: IToken };

    const isVerified = jwt.verify(
      payload.token.refreshToken,
      `${process.env.NEXT_PUBLIC_JWT_SECRET_KET}`
    );

    console.log("isVerified ->", isVerified);

    if (!isVerified) throw new Error("expired refresh token");

    // refreshToken이 매칭되는지 알려면, refreshToken을 복호화해야함
    const info = jwt.decode(payload.token.refreshToken) as { userId: string };

    const user = (await client
      .db("reservation")
      .collection("members")
      .findOne({ _id: new ObjectId(info.userId) })) as IMember;

    if (user.refreshToken !== payload.token.refreshToken)
      throw new Error("not matched refresh token");

    const accessToken = jwt.sign(
      { userId: user._id },
      `${process.env.NEXT_PUBLIC_JWT_SECRET_KET}`,
      { expiresIn: "24h" }
    );

    const data = {
      ...payload.token,
      accessTokenExpiry: Date.now() + 60 * 60 * 1000,
      accessToken,
    };
    return response("success refresh access token", data, true);
  } catch (error: any) {
    return response(error.message, null, false);
  }
};
