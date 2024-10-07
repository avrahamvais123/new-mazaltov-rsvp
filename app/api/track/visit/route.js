// app/api/track/visit/route.js
import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongoDB";

export async function POST(req) {
  const { ip, page, referrer, timeSpent, timestamp } = await req.json();
  console.log('timestamp: ', timestamp);
  console.log('timeSpent: ', timeSpent);
  console.log('referrer: ', referrer);
  console.log('page: ', page);
  console.log('ip: ', ip);

  try {
    const visitsCollection = await getCollection("visits");

    // שמור את כל המידע במסד הנתונים
    await visitsCollection.insertOne({
      ip,
      page,
      referrer,
      timeSpent,
      timestamp,
      visitedAt: new Date(),
    });

    return NextResponse.json({ message: "Visit tracked successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error tracking visit", error },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const visitsCollection = await getCollection("visits");
    const results = await visitsCollection.deleteMany({});
    console.log("results: ", results);

    return NextResponse.json({
      message: "כל המעקבים נמחקו בהצלחה",
      data: results,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "הייתה שגיאה במחיקת המעקבים", error },
      { status: 500 }
    );
  }
}
