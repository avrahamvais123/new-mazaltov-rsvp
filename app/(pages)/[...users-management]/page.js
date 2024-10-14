import { MailAtSign01Icon, PassportIcon } from "@/app/icons/icons";
import { getCollection } from "@/lib/mongoDB";
import Image from "next/image";
import React from "react";
import SendAccessLink from "./components/SendAccessLink";
import ResetPassword from "./components/ResetPassword";
import jwt from "jsonwebtoken";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

const Page = async ({ searchParams }) => {
  const session = await auth();
  console.log("session: ", session);

  if (session?.user?.email !== ADMIN_EMAIL) {
    redirect("/");
  }

  const token = searchParams?.token;
  console.log("token: ", token);

  let decodedToken;

  // ניהול שגיאות
  try {
    decodedToken = jwt?.verify(token, JWT_SECRET);
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

  // המשך בקוד רק אם הטוקן תקף
  if (!decodedToken) return null;

  const usersCollection = await getCollection("users");
  const users = await usersCollection.find().toArray();

  if (!users) return null;

  return (
    <div className="size-full flex-col-center justify-start items-start gap-4 p-4">
      <h1 className="text-2xl font-bold mb-8">לוח ניהול משתמשים</h1>

      <div className="w-full flex-col-center items-start -space-y">
        {users.map((user, idx) => {
          return (
            <>
              <div
                key={user?.email}
                className="w-full p-4 flex-center justify-start items-start gap-4 border-b first:border-t"
              >
                <Image
                  src={user?.image || "/images/user-1.png"}
                  alt="תמונת המשתמש"
                  width={45}
                  height={45}
                  className="rounded-full bg-slate-50 ring-4 ring-slate-100"
                />
                <div className="flex-col-center justify-start items-start gap-0.5">
                  <h1 className="font-bold mb-1 -mt-1">{user?.name}</h1>
                  <span className="flex-center justify-start gap-2">
                    <PassportIcon className="size-5 text-slate-400" />
                    <p className="text-sm">{user?._id.toString()}</p>
                  </span>

                  <span className="flex-center justify-start gap-2">
                    <MailAtSign01Icon className="size-5 text-slate-400" />
                    <p className="text-sm">{user?.email}</p>
                  </span>

                  <span className="flex-center justify-start gap-2">
                    <ResetPassword token={decodedToken} email={user?.email} />
                  </span>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
