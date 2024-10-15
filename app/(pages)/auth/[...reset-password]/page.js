import React from "react";
import ResetPassword from "./components/ResetPassword";
import Link from "next/link";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const Page = async ({ searchParams }) => {
  const token = searchParams?.token;

  try {
    const verifiedToken = jwt.verify(token, JWT_SECRET);

    return <ResetPassword token={verifiedToken} />;
  } catch (error) {
    console.log(error);
    return (
      <div className="size-full flex-col-center">
        <h1 className="text-4xl font-bold text-red-600">עבר הזמן</h1>
        <p className="mb-4">חזור לשחזור סיסמה</p>
        <Link
          href="/auth/reset-password"
          className="bg-indigo-600 text-white py-2 px-4 rounded-sm"
        >
          שחזור סיסמה
        </Link>
      </div>
    );
  }
};

export default Page;
