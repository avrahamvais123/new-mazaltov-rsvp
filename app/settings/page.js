import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

const Page = async () => {
  const session = await auth();
  console.log("session: ", session);

  if (!session) {
    // אם אין session, הפנה את המשתמש לדף הכניסה
    redirect("/auth/signin");
  }

  return (
    <div>
      <h1>Settings</h1>
    </div>
  );
};

export default Page;
