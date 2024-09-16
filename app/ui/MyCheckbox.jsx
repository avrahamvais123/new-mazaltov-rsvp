"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { CheckmarkCircle01Icon as CheckIcon } from "../icons/icons";

const MyCheckbox = ({
  text = "טקסט",
  field,
  labelClassName,
  textClassName,
  inputClassName,
  iconClassName,
  errors,
  register = () => {},
}) => {
  const [checked, setChecked] = useState(false);
  return (
    <label
      className={cn(
        "relative w-full max-w-md",
        "border px-3 py-2 rounded-sm",
        "flex-center justify-between gap-2",
        "border-slate-200 group",
        "peer-checked:border-indigo-600", // שינוי צבע הבורדר כאשר ה-checkbox מסומן
        "peer-checked:bg-indigo-50", // שינוי צבע הרקע כאשר ה-checkbox מסומן
        labelClassName
      )}
    >
      <span className={cn("text-gray-700", textClassName)}>{text}</span>

      <input
        type="checkbox"
        {...register(field)}
        className={cn(
          "appearance-none peer hidden size-5",
          "rounded-full transition-all",
          "border border-slate-200"
        )}
      />
      <CheckIcon
        className={cn(
          "relative size-5 transition-all",
          "opacity-0 peer-checked:opacity-100",
          "text-indigo-600 rounded-full",
          //"before:absolute before:top-0 before:left-0",
          "before:border-4 before:border-red-600 before:rounded-full",
          iconClassName
        )}
      />
    </label>
  );
};

export default MyCheckbox;
