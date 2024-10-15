import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import ProfileMenu from "./components/ProfileMenu";

const Page = async () => {
  const session = await auth(); // קריאה ל-auth()

  if (!session) {
    // הפנה את המשתמש לדף הכניסה אם אין session
    redirect("/auth/signin");
  }

  return (
    <div className="size-full p-4 flex-col-center items-start gap-4 overflow-hidden">
      <h1 className="text-xl font-semibold md:mr-[16.5rem] text-slate-400">
        הגדרות
      </h1>

      <div className="size-full flex-center gap-4 overflow-hidden">
        <ProfileMenu />
      </div>
    </div>
  );
};

export default Page;
