"use client";

import { cn } from "@/lib/utils";
import React from "react";

const Input = ({ value, input, errors, register = () => {} }) => {
  const required =
    typeof input?.required === "string"
      ? input.required
      : input?.required === true
      ? "זהו שדה חובה"
      : null;

  return (
    <>
      <input
        id={input?.name}
        type={input?.type}
        placeholder=" "
        {...register(input?.name, {
          required: required,
          pattern: input?.pattern && {
            value: input?.pattern,
            message: "הערך אינו תואם את התבנית הנדרשת",
          },
        })}
        className={cn(
          "w-full border px-4 py-2 peer",
          "focus:outline-indigo-800",
          errors[input?.name] && "border-red-500"
        )}
      />
      <label
        htmlFor={input?.name}
        className={cn(
          "absolute right-0 top-2 mx-4 text-gray-400 transition-all transform",
          "peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:px-2 peer-focus:mx-0",
          value
            ? "bg-white -translate-y-5 scale-75 px-2 mx-0"
            : "bg-white peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100",
          errors[input?.name] && "text-red-500"
        )}
      >
        {input?.label}
      </label>
      {errors[input?.name] && (
        <span className="text-red-500 text-sm">
          {errors[input?.name]?.message}
        </span>
      )}
    </>
  );
};

export default Input;
