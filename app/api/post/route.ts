import { Post } from "@/services/model";
import { client } from "@/utils/database";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const response = <T>(message: string, data: T, ok: boolean) => {
  return NextResponse.json({ message, data, ok }, { status: ok ? 200 : 400 });
};

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get("id");
    const keyword = searchParams.get("keyword");

    const db = client.db("reservation");
    const collection = await db.collection("events");

    if (keyword) {
      const data = await collection
        .aggregate([
          {
            $search: {
              // $search -> where
              index: "default", // index는 atlas search에 설정한 index 중 어떤 index를 쓸지.(기본은 default)
              text: {
                query: "테스트",
                path: {
                  // path가 collection에서 어떤 field를 바라볼지.
                  wildcard: "*",
                },
              },
            },
          },
        ])
        .toArray();

      return response("success", data, true);
    }

    const data = id
      ? ((await collection.findOne({ _id: new ObjectId(id) })) as IEvent)
      : ((await collection.find({}).toArray()) as IEvent[]);

    return response("success", data, true);
  } catch (error: any) {
    console.log("error =>", error);

    return response("Failed Get", { message: error.message }, false);
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const payload = await request.json();

    const db = client.db("reservation");
    const res = await db.collection("events").insertOne({
      title: payload.title,
      content: payload.content,
      start_date: new Date(),
      end_date: new Date(),
      reg_date: new Date(),
    });

    const insertedItem = await db
      .collection("events")
      .findOne({ _id: res.insertedId });

    return response("Success Write", insertedItem, true);
  } catch (error: any) {
    return response("Failed Write", { message: error.message }, false);
  }
};

export const PUT = async (request: NextRequest) => {
  try {
    const payload = await request.json();

    const { _id: id } = payload;

    if (!id) {
      throw new Error("Required Id");
    }

    const db = client.db("reservation");

    const data = new Post({
      _id: id,
      title: payload.title,
      content: payload.content,
    });

    const res = await db
      .collection("events")
      .updateOne({ _id: data.id }, { $set: data });

    const updatedItem = await db.collection("events").findOne({ _id: data.id });

    return response("Success Update", updatedItem, true);
  } catch (error: any) {
    return response("Failed Update", { message: error.message }, true);
  }
};
