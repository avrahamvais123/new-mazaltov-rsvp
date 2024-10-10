import { auth } from "@/lib/auth";
import { getCollection } from "@/lib/mongoDB";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const PATCH = async (req) => {
  try {
    const { currentPassword, newPassword } = await req.json();
    console.log("currentPassword, newPassword: ", currentPassword, newPassword);

    const { email } = await auth();
    console.log("email: ", email);

    const user = await getCollection("users").findOne({ email });

    const confirmPassword = await bcrypt.compare(
      currentPassword,
      user?.password
    );

    if (confirmPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await getCollection("users").updateOne(
        { email },
        { $set: { password: hashedPassword } }
      );
      return NextResponse.json(
        { message: "הסיסמה שונתה בהצלחה" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "הסיסמה אושרה בהצלחה" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
