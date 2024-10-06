import { getCollection } from "@/lib/mongoDB";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const PATCH = async (req) => {
  try {
    const res = await req.json();
    console.log("res: ", res);
    const { email } = res;
    console.log("email: ", email);

    const usersCollection = await getCollection("users");
    const user = await usersCollection.findOne({ email });
    console.log("user: ", user);

    // אם המשתמש אינו קיים
    if (!user) {
      return NextResponse.json({ message: "לא נמצא משתמש" }, { status: 400 });
    }

    // אם יש סיסמה חדשה, מצפין ומשנה אותה
    if (res?.newPassword) {
      const hashedPassword = await bcrypt.hash(res?.newPassword, 10);
      console.log("hashedPassword: ", hashedPassword);
      console.log("email: ", email);

      await usersCollection.updateOne(
        { email },
        { $set: { password: hashedPassword } }
      );
    }

    // אם יש עדכונים אחרים, מעדכן אותם
    if (res?.updates) {
      await usersCollection.updateOne({ email }, { $set: res?.updates });
    }

    return NextResponse.json(
      { message: "הסיסמה שונתה בהצלחה" },
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
