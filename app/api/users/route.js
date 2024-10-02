import { getCollection } from "@/lib/mongoDB";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";

export const PATCH = async (req) => {
  try {
    const res = await req.json();

    const usersCollection = await getCollection("users");
    const user = await usersCollection.findOne({ _id: new ObjectId(res?.id) });

    // אם המשתמש אינו קיים
    if (!user) {
      return NextResponse.json({ message: "לא נמצא משתמש" }, { status: 400 });
    }

    if (res?.newPassword) {
      const hashedPassword = await bcrypt.hash(res?.newPassword, 10);

      const results = await usersCollection.updateOne(
        { _id: new ObjectId(res?.id) },
        { $set: { password: hashedPassword } }
      );
      return NextResponse.json(
        { data: results, message: "הסיסמה שונתה בהצלחה" },
        { status: 200 }
      );
    }

    const results = await usersCollection.updateOne(
      { _id: new ObjectId(res?.id) },
      { $set: res?.updates }
    );
    return NextResponse.json(
      { data: results, message: "הסיסמה שונתה בהצלחה" },
      { status: 200 }
    );
  } catch (error) {
    console.log("error: ", error);
    return NextResponse.json(
      { error: error?.message, message: "שגיאת שרת" },
      { status: 500 }
    );
  }
};
