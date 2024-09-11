import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongoDB";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ message: "חסרים אימייל או סיסמה" }),
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("mazaltov-rsvp");

    const existingUser = await db.collection("users").findOne({ email });

    if (existingUser) {
      return new Response(JSON.stringify({ message: "המשתמש כבר קיים" }), {
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    };

    await db.collection("users").insertOne(newUser);

    return new Response(JSON.stringify({ message: "המשתמש נרשם בהצלחה" }), {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "שגיאת שרת" }), {
      status: 500,
    });
  }
}
