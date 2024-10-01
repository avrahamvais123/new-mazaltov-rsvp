"use client";

import { cn } from "@/lib/utils";
import React from "react";

export const Divider = ({ className, ...props }) => {
  return (
    <div {...props} className={cn("h-[1px] w-full bg-slate-200", className)} />
  );
};
