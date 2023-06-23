import { client } from "@/utils/database";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const db = client.db("reservation");
    const collection = await db.collection("events");

    const data = id
      ? ((await collection.findOne({ _id: new ObjectId(id) })) as IEvent)
      : ((await collection.find({}).toArray()) as IEvent[]);

    return NextResponse.json(
      { message: "success", data, ok: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "fail", data: {}, ok: false },
      { status: 400 }
    );
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

    return NextResponse.json({
      message: "Success Write",
      data: insertedItem,
      ok: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Fail Write", data: { message: error.message }, ok: false },
      { status: 400 }
    );
  }
};

export const PUT = async (request: NextRequest) => {
  try {
    const payload = await request.json();

    const { _id: id } = payload;

    const db = client.db("reservation");
    const data = {
      title: payload.title,
      content: payload.content,
      start_date: new Date(),
      end_date: new Date(),
      reg_date: new Date(),
    };

    if (!id) {
      throw new Error("Required Id");
    }

    const res = await db
      .collection("events")
      .updateOne({ _id: new ObjectId(id) }, { $set: data });

    const updatedItem = await db
      .collection("events")
      .findOne({ _id: new ObjectId(id) });

    return NextResponse.json({
      message: "Success Update",
      data: updatedItem,
      ok: true,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Fail Write", data: {}, ok: false },
      { status: 400 }
    );
  }
};
