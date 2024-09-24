"use client";

import { cn } from "@/lib/utils";
import React from "react";

const Textarea = ({
  className,
  value,
  field,
  fieldsClassName,
  errors = {},
  register = () => {},
  ...props
}) => {
  return (
    <>
      <textarea
        {...props}
        {...register(field?.name)}
        placeholder=""
        className={cn(
          "w-full p-2 peer",
          "border border-slate-200",
          "rounded-md resize-none",
          className
        )}
      ></textarea>

      <label
        htmlFor={field?.name}
        className={cn(
          "absolute right-0 top-2 mx-4 text-gray-400 transition-all transform",
          "peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:px-2 peer-focus:mx-0",
          value
            ? "bg-white -translate-y-5 scale-75 px-2 mx-0"
            : "bg-white peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100",
          errors[field?.name] && "text-red-500"
        )}
      >
        {field?.label}
      </label>
      {errors[field?.name] && (
        <span className="text-red-500 text-sm">
          {errors[field?.name]?.message}
        </span>
      )}
    </>
  );
};

export default Textarea;
