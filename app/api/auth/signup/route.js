import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongoDB";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    console.log("password: ", password);
    console.log("email: ", email);
    console.log("name: ", name);

    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ message: "חסרים אימייל או סיסמה או שם" }),
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("mazaltov-rsvp").collection("users");

    const existingUser = await db.findOne({ email });

    if (existingUser) {
      return new Response(JSON.stringify({ message: "המשתמש כבר קיים" }), {
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      accounts: [], // הוספת שדה accounts
    });

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
