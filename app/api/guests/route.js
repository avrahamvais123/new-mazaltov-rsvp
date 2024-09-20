import clientPromise from "@/lib/mongoDB";

export const GET = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("mazaltov-rsvp");

    // שליפת כל המוזמנים והמרתם למערך
    const allGuests = await db.collection("guests").find({}).toArray();

    console.log("allGuests: ", allGuests);

    if (allGuests.length === 0) {
      return new Response(
        JSON.stringify({
          status: 400,
          message: "לא נמצאו מוזמנים",
        }),
        { status: 400 }
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

export const DELETE = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("mazaltov-rsvp");

    // מחיקת כל המוזמנים
    const deleteAllGuests = await db.collection("guests").deleteMany({});
    console.log("deleteAllGuests: ", deleteAllGuests);

    return new Response(
      JSON.stringify({
        data: deleteAllGuests,
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
