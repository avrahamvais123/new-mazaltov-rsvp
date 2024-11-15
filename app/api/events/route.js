import { getCollection } from "@/lib/mongoDB";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const events = await getCollection("events").find().toArray();
    console.log("events: ", events);

    return NextResponse.json({ events });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const POST = async (req) => {
  try {
    const res = await req.json();
    console.log("res: ", res);
    const event = await getCollection("events").insertOne(res);
    console.log("results: ", results);

    return NextResponse.json({
      message: "האירוע נשמר בהצלחה!!",
      event,
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
