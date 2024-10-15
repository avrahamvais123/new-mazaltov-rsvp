"use client";

import { cn } from "@/lib/utils";
import React from "react";

const MyButton = (props) => {
  console.log("props: ", props);


  return (
    <button
      className={cn(
        "bg-pink-500 text-white",
        "px-4 py-2 rounded-sm transition-all",
        "hover:bg-pink-600 hover:text-purple-100",
        "active:bg-pink-700 active:text-purple-100",
        props?.className
      )}
      onClick={() => console.log("click")}
    >
      {props?.children}
    </button>
  );
};

export default MyButton;