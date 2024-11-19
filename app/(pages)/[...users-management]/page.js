import { getCollection } from "@/lib/mongoDB";
import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ManagementUsers from "./components/ManagementUsers";
import VerificationCode from "./components/VerificationCode";

const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

const Page = async () => {
  const session = await auth();

  if (session?.user?.email !== ADMIN_EMAIL) {
    redirect("/");
  }

  return <VerificationCode />;
};

export default Page;

//! לא למחוק זה קובץ של שליחת קישור כניסה למייל
/* // ודא ש-`searchParams` נטען לפני הגישה אליו
const { token } = await searchParams;

if (!token) {
  return (
    <div className="size-full flex-col-center justify-center items-center p-4">
      <h1 className="text-2xl font-bold text-red-500">אין טוקן</h1>
      <p className="mb-4">נא לנסות שוב עם קישור חוקי.</p>
      <SendAccessLink />
    </div>
  );
}

// אימות הטוקן
const decodedToken = verifyToken(token);

if (!decodedToken) {
  return (
    <div className="size-full flex-col-center justify-center items-center p-4">
      <h1 className="text-2xl font-bold text-red-500">פג תוקף הקישור</h1>
      <p className="mb-4">
        הקישור אינו תקף יותר. נא ללחוץ על הכפתור של שליחה נוספת.
      </p>
      <SendAccessLink />
    </div>
  );

  const verifyToken = (token) => {
  try {
    return jwt?.verify(token, JWT_SECRET);
  } catch (error) {
    console.log("Token error: ", error.message);
    return null; // החזרת null אם הטוקן אינו תקף
  }
};

const usersCollection = await getCollection("users");
  const users = await usersCollection.find().toArray();

  if (!users) return null;

  const plainUsers = users.map((user) => ({
    ...user,
    _id: user._id.toString(),
    createdAt: user.createdAt?.toISOString(),
  }));
} */

/* <span className="flex-center justify-start gap-2">
                      <ResetPassword token={decodedToken} email={user?.email} />
                    </span> */
