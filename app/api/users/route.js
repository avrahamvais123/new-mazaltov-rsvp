import { getCollection } from "@/lib/mongoDB";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { auth } from "@/lib/auth";

export const PATCH = async (req) => {
  try {
    const {
      user: { email },
    } = await auth();

    console.log("email: ", email);

    const { currentPassword, newPassword, name, image } = await req.json();
    console.log("image: ", image);
    console.log("name: ", name);
    console.log("currentPassword: ", currentPassword);
    console.log("newPassword: ", newPassword);

    const usersCollection = await getCollection("users");
    const user = await usersCollection.findOne({ email });
    console.log("user: ", user);

    // אם המשתמש אינו קיים
    if (!user) {
      return NextResponse.json({ message: "לא נמצא משתמש" }, { status: 400 });
    }

    // משווה את הסיסמה הנוכחית עם הסיסמה ממסד הנתונים
    const confirmPassword = await bcrypt.compare(
      currentPassword,
      user?.password
    );

    // אם הסיסמאות אינן זהות מחזיר שגיאה
    if (!confirmPassword && currentPassword)
      return NextResponse.json({ message: "הסיסמה שגויה" }, { status: 400 });

    // אם הסיסמאות זהות מצפין את הסיסמה החדשה (אם ניתנה סיסמה חדשה)
    let updateData = {};

    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      console.log("hashedPassword: ", hashedPassword);
      updateData.password = hashedPassword;
    }

    // אם יש שם חדש או תמונה חדשה מעדכן גם אותם
    if (name) updateData.name = name;
    if (image) updateData.image = image;

    console.log("updateData: ", updateData);

    // מעדכן את המשתמש במסד הנתונים
    await usersCollection.updateOne({ email }, { $set: updateData });

    const updatedUser = await usersCollection.findOne({ email });

    return NextResponse.json(
      { user: updatedUser, message: "הפרטים שונו בהצלחה!" },
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
