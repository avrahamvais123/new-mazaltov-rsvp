import { MailAtSign01Icon, PassportIcon } from "@/app/icons/icons";
import { getCollection } from "@/lib/mongoDB";
import Image from "next/image";
import React from "react";
import SendAccessLink from "./components/SendAccessLink";
import ResetPassword from "./components/ResetPassword";
import jwt from "jsonwebtoken";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";
import UsersList from "./components/UsersList";

const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

const verifyToken = (token) => {
  // ניהול שגיאות
  try {
    return jwt?.verify(token, JWT_SECRET);
  } catch (error) {
    console.log("Token error: ", error.message);

    // ניהול השגיאה: כאן ניתן להחזיר הודעה למשתמש או לעשות כל פעולה אחרת
    return (
      <div className="size-full flex-col-center justify-center items-center p-4">
        <h1 className="text-2xl font-bold text-red-500">פג תוקף הקישור</h1>
        <p className="mb-4">
          הקישור אינו תקף יותר. נא ללחוץ על הכפתור של שליחה נוספת.
        </p>
        <SendAccessLink />
      </div>
    );
  }
};

/*
 ** אזור מנהל המשתמשים
 */
const Page = async ({ searchParams }) => {
  const session = await auth();

  if (session?.user?.email !== ADMIN_EMAIL) {
    redirect("/");
  }

  // אימות הטוקן
  const decodedToken = verifyToken(searchParams?.token);

  // המשך בקוד רק אם הטוקן תקף
  if (!decodedToken) return null;

  const usersCollection = await getCollection("users");
  const users = await usersCollection.find().toArray();

  if (!users) return null;

  return (
    <div className="size-full overflow-hidden flex-col-center justify-start items-start gap-4 p-4">
      <h1 className="text-xl mb-8 text-slate-400">לוח ניהול משתמשים</h1>
      <UsersList users={users} />
    </div>
  );
};

export default Page;

/* <span className="flex-center justify-start gap-2">
                      <ResetPassword token={decodedToken} email={user?.email} />
                    </span> */
