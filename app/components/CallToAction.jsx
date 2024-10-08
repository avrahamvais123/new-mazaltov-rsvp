"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

const CallToAction = ({ navigateTo, text, className, ...props }) => {
  const router = useRouter();

  return (
    <button
      {...props}
      className={cn("bg-white hover:bg-white/50 transition-all py-2 px-4 rounded-sm", className)}
      onClick={() => {
        router.push(navigateTo);
      }}
    >
      {text}
    </button>
  );
};

export default CallToAction;
