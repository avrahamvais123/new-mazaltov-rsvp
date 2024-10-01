"use client";

import {
  TaskEdit02Icon,
  CheckmarkCircle01Icon as CheckIcon,
} from "@/app/icons/icons";
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import { useCopyToClipboard } from "react-use";

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
      <section className="size-full flex-col-center items-start text-slate-400 py-4 px-6 gap-4 rounded-md border border-slate-100">
        <h1 className="text-lg font-semibold text-slate-400">פרופיל</h1>

        <div className="h-[1px] w-full bg-slate-100" />

        {/* user name */}
        <span className="w-full flex-col-center items-start">
          <p className="text-[0.8rem]">שם משתמש</p>
          <h2 className="-mt-1 font-semibold text-slate-600 truncate max-w-full hover:text-clip">
            {session?.user?.name}
          </h2>
        </span>

        <div className="h-[1px] w-full bg-slate-100" />

        {/* user id */}
        <span className="w-full flex-col-center items-start">
          <span className="text-[0.8rem] flex-center gap-1">
            <p className="">מזהה לקוח</p>
            <button onClick={() => copyToClipboard(session?.user?.id)}>
              {isCopy ? (
                <CheckIcon className="text-green-600 size-5" />
              ) : (
                <TaskEdit02Icon className="size-5 text-slate-400 hover:text-indigo-600 active:text-indigo-800" />
              )}
            </button>
          </span>
          <h2 className="font-semibold text-slate-600 truncate max-w-full hover:text-clip">
            {session?.user?.id}
          </h2>
        </span>

        <div className="h-[1px] w-full bg-slate-100" />

        {/* email */}
        <span className="w-full flex-col-center items-start">
          <p className="text-[0.8rem]">אימייל</p>
          <h2 className="-mt-1 font-semibold text-slate-600 truncate max-w-full hover:text-clip">
            {session?.user?.email}
          </h2>
        </span>

        <div className="h-[1px] w-full bg-slate-100" />

        {/* image */}
        <span className="w-full flex-center justify-start gap-3">
          <img
            src={session?.user?.image}
            alt="תמונת משתמש"
            className="size-14 rounded-full"
          />
          <button
            className={cn(
              "py-1.5 px-3 text-sm",
              "border rounded-md transition-all",
              "hover:bg-indigo-600 hover:border-indigo-600 hover:text-white"
            )}
          >
            העלה תמונה
          </button>
        </span>
      </section>

      {/* password */}
      <section className="w-full h-full flex-col-center items-start text-slate-400 py-4 px-6 gap-4 rounded-md border border-slate-100">
        <h1 className="text-lg font-semibold text-slate-400">סיסמה</h1>

        <div className="h-[1px] w-full bg-slate-100" />

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
