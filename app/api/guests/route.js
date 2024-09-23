import clientPromise from "@/lib/mongoDB";
import { ObjectId } from "mongodb";

export const GET = async (req) => {
  // קבלת ה-URL מהבקשה
  const url = new URL(req.url);

  // קבלת הפרמטרים מה-URL
  const belongsTo = url.searchParams.get("belongsTo");
  console.log("belongsTo: ", belongsTo);

  try {
    const client = await clientPromise;
    const db = client.db("mazaltov-rsvp");

    // שליפת כל המוזמנים והמרתם למערך
    const allGuests = await db
      .collection("guests")
      .find({ belongsTo })
      .toArray();

    //console.log("allGuests: ", allGuests);

    if (allGuests.length === 0) {
      return new Response(
        JSON.stringify({
          data: [],
          status: 400,
          message: "לא נמצאו מוזמנים",
        })
      );
    }

    return new Response(
      JSON.stringify({
        data: allGuests,
        status: 200,
        message: "נמצאו מוזמנים",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("error: ", error);
    return new Response(
      JSON.stringify({
        status: 500,
        message: "שגיאה בשליפת המוזמנים",
      }),
      { status: 500 }
    );
  }
};

export const POST = async (req) => {
  try {
    const res = await req.json();
    console.log("res: ", res);

    const client = await clientPromise;
    const db = client.db("mazaltov-rsvp");

    // הוספת אורח חדש בקולקציה "guests"
    const result = await db.collection("guests").insertOne(res);
    console.log("insert result: ", result);

    if (!result.acknowledged) {
      return new Response(
        JSON.stringify({
          status: 400,
          message: "האורח לא נוצר",
        })
      );
    }

    // משיכת המידע של המסמך החדש שנוסף
    const newGuest = await db
      .collection("guests")
      .findOne({ _id: result.insertedId });
    console.log("newGuest: ", newGuest);

    return new Response(
      JSON.stringify({
        data: newGuest,
        status: 200,
        message: "האורח נוצר בהצלחה!",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("error: ", error);
    return new Response(
      JSON.stringify({
        status: 500,
        message: "שגיאה ביצירת האורח",
      }),
      { status: 500 }
    );
  }
};

export const PATCH = async (req) => {
  try {
    const res = await req.json();
    console.log("res: ", res);

    if (!res?.id) {
      return new Response(
        JSON.stringify({
          status: 400,
          message: "לא נמצא מזהה לעדכון",
        })
      );
    }

    const client = await clientPromise;
    const db = client.db("mazaltov-rsvp").collection("guests");

    // עדכון המסמך
    const result = await db.updateOne(
      { _id: new ObjectId(res?.id), belongsTo: res?.belongsTo },
      { $set: res?.updates }
    );

    return new Response(
      JSON.stringify({
        data: result,
        status: 200,
        message: "המוזמנים עודכנו בהצלחה",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("error: ", error);
    return new Response(
      JSON.stringify({
        status: 500,
        message: "שגיאה בעדכון המוזמנים",
      }),
      { status: 500 }
    );
  }
};

export const DELETE = async (req) => {
  try {
    const res = await req.json();
    console.log("Received IDs: ", res?.ids);

    const client = await clientPromise;
    const db = client.db("mazaltov-rsvp");

    // מחיקת מוזמן לפי מערך של ids
    const deleteGuestsByIds = await db.collection("guests").deleteMany({
      belongTo: res?.belongTo,
      _id: { $in: res?.ids.map((id) => new ObjectId(id)) },
    });
    console.log("deleteGuestsByIds: ", deleteGuestsByIds);

    return new Response(
      JSON.stringify({
        data: deleteGuestsByIds,
        status: 200,
        message: "המוזמנים נמחקו בהצלחה",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("error: ", error);
    return new Response(
      JSON.stringify({
        status: 500,
        message: "שגיאה במחיקת המוזמנים",
      }),
      { status: 500 }
    );
  }
};
