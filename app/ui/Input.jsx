"use client";

import { cn } from "@/lib/utils";
import React from "react";

const Input = ({
  value,
  field,
  className,
  fieldsClassName,
  errors = {},
  register = () => {},
}) => {
  const required =
    typeof field?.required === "string"
      ? field.required
      : field?.required === true
      ? "זהו שדה חובה"
      : null;

  return (
    <>
      <input
        id={field?.name}
        type={field?.type}
        placeholder=" "
        {...register(field?.name, {
          required: required,
          pattern: field?.pattern && {
            value: field?.pattern,
            message: "הערך אינו תואם את התבנית הנדרשת",
          },
        })}
        className={cn(
          "w-full border px-4 py-2 peer",
          "focus:outline-indigo-800 rounded-sm",
          errors[field?.name] && "border-red-500",
          fieldsClassName,
          className
        )}
      />
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
      <div className="flex-center justify-start gap-2">
        {errors[field?.name] && (
          <span className="text-red-500 text-sm">
            {errors[field?.name]?.message}
          </span>
        )}
        {field?.helperText}
      </div>
    </>
  );
};

export default Input;
