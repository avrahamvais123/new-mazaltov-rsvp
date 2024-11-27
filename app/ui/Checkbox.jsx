"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";
import { Tick04Icon as CheckIcon } from "../icons/huge-icons";

const Checkbox = ({ checked, indeterminate, ...props }) => {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate; // הגדרת indeterminate על ה-ref
    }
  }, [indeterminate]);

  return (
    <label className="relative">
      <input
        {...props}
        type="checkbox"
        checked={checked}
        className={cn(
          "appearance-none size-5",
          "absolute-center",
          "cursor-pointer transition-all duration-200",
          "border border-slate-300 rounded-sm",
          checked
            ? "bg-indigo-600 border-indigo-600"
            : "hover:border-indigo-600"
        )}
      />
      <CheckIcon
        className={cn(
          "size-4 cursor-pointer",
          "absolute-center",
          "text-white transition-all",
          !checked && "hidden"
        )}
      />
    </label>
  );
};

export default Checkbox;
