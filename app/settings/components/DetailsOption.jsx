"use client";

import {
  TaskEdit02Icon,
  CheckmarkCircle01Icon as CheckIcon,
} from "@/app/icons/icons";
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import { useCopyToClipboard } from "react-use";
import AvatarUpload from "./AvatarUpload";
import { Divider } from "@/app/ui/Divider";

const DetailsOption = ({ session }) => {
  const [copy, copyToClipboard] = useCopyToClipboard();
  const [isCopy, setIsCopy] = useState(false);

  useEffect(() => {
    if (copy?.value) {
      setIsCopy(true);
      setTimeout(() => {
        setIsCopy(false);
      }, 2000);
    }
  }, [copy]);

  return (
    <div className="w-full h-full flex-col-center justify-start gap-2 flex-grow overflow-auto">
      {/* profile */}
      <section className="size-full flex-col-center items-start text-slate-400 py-4 px-6 gap-4 border-slate-100">
        <h1 className="font-medium border border-slate-200 text-slate-400 bg-slate-50 rounded-sm px-3 py-1">פרופיל</h1>

        {/* <Divider /> */}

        {/* user name */}
        <span className="w-full flex-col-center items-start">
          <p className="text-[0.8rem]">שם משתמש</p>
          <h2 className="-mt-1 font-medium text-slate-400 truncate max-w-full hover:text-clip">
            {session?.user?.name}
          </h2>
        </span>

        <Divider />

        {/* user id */}
        <span className="w-full flex-col-center items-start">
          <span className="text-[0.8rem] flex-center gap-1">
            <p>מזהה לקוח</p>
            <button onClick={() => copyToClipboard(session?.user?.id)}>
              {isCopy ? (
                <CheckIcon className="text-green-600 size-5" />
              ) : (
                <TaskEdit02Icon className="size-5 text-slate-400 hover:text-indigo-600 active:text-indigo-800" />
              )}
            </button>
          </span>
          <h2 className="font-medium text-slate-400 truncate max-w-full hover:text-clip">
            {session?.user?.id}
          </h2>
        </span>

        <Divider />

        {/* email */}
        <span className="w-full flex-col-center items-start">
          <p className="text-[0.8rem]">אימייל</p>
          <h2 className="-mt-1 font-medium text-slate-400 truncate max-w-full hover:text-clip">
            {session?.user?.email}
          </h2>
        </span>

        <Divider />

        {/* image */}
        <span className="w-full flex-center justify-start gap-3">
          <AvatarUpload session={session} />
        </span>
      </section>

      {/* password */}
      <section className="w-full h-full flex-col-center items-start text-slate-400 py-4 px-6 gap-4 border-slate-100">
        <h1 className="font-medium border border-slate-200 text-slate-400 bg-slate-50 rounded-sm px-3 py-1">סיסמה</h1>

        {/* <Divider /> */}

        <label className="w-full flex-col-center items-start">
          <p className="text-[0.8rem]">סיסמה נוכחית</p>
          <input className="border" />
        </label>
        <label className="w-full flex-col-center items-start">
          <p className="text-[0.8rem]">סיסמה נוכחית</p>
          <input className="border" />
        </label>
      </section>
    </div>
  );
};

export default DetailsOption;
