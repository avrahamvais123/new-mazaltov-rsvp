"use client";

import { cn } from "@/lib/utils";
import React from "react";

const EditorButton = ({ className, children, ...props }) => {
  return (
    <button
      {...props}
      className={cn(
        "cursor-pointer h-full w-10",
        "group p-1.5 flex-center",
        "*:transition-all *:text-slate-400",
        "bg-slate-700 rounded-sm",
        "hover:brightness-90 active:brightness-75",
        className
        //"hover:bg-slate-600 active:bg-slate-500"
      )}
    >
      {children}
    </button>
  );
};

export default EditorButton;
