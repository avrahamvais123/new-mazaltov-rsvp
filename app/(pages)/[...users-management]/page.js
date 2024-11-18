import { getCollection } from "@/lib/mongoDB";
import React from "react";
import SendAccessLink from "./components/SendAccessLink";
import jwt from "jsonwebtoken";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ManagementUsers from "./components/ManagementUsers";

const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

const verifyToken = (token) => {
  try {
    return jwt?.verify(token, JWT_SECRET);
  } catch (error) {
    console.log("Token error: ", error.message);
    return null; // החזרת null אם הטוקן אינו תקף
  }
};

const Page = async ({ searchParams }) => {
  const session = await auth();

  if (session?.user?.email !== ADMIN_EMAIL) {
    redirect("/");
  }

  // ודא ש-`searchParams` נטען לפני הגישה אליו
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
  }

  const usersCollection = await getCollection("users");
  const users = await usersCollection.find().toArray();

  if (!users) return null;

  const plainUsers = users.map((user) => ({
    ...user,
    _id: user._id.toString(),
    createdAt: user.createdAt?.toISOString(),
  }));

  return <ManagementUsers users={plainUsers} />;
};

export default Page;

/* <span className="flex-center justify-start gap-2">
                      <ResetPassword token={decodedToken} email={user?.email} />
                    </span> */
