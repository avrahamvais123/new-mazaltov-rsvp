"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { ViewIcon, ViewOffSlashIcon } from "../icons/huge-icons";

const Input = ({
  value,
  field,
  classNames = {},
  fieldsClassName,
  errors = {},
  register = () => {},
}) => {
  const [viewPassword, setViewPassword] = useState(true);

  const required =
    typeof field?.required === "string"
      ? field.required
      : field?.required === true
      ? "זהו שדה חובה"
      : null;

  const changeType = () => {
    return field?.type === "password"
      ? viewPassword
        ? "text"
        : "password"
      : field?.type;
  };

  return (
    <>
      <div
        className={cn(
          "relative flex-center",
          "border border-slate-300",
          "rounded-md transition-all",
          "focus-within:border-indigo-800",
          //"ring-2 ring-transparent",
          //"focus-within:ring-2",
          //"focus-within:ring-indigo-800",
          classNames?.wrapper
        )}
      >
        {/* icon before */}
        {field?.iconBefore && (
          <span className="px-1.5 flex-center border-l *:text-slate-300">
            {field?.iconBefore}
          </span>
        )}

        {/* input */}
        <input
          id={field?.name}
          type={changeType()}
          placeholder=""
          {...register(field?.name, {
            required: required,
            pattern: field?.pattern && {
              value: field?.pattern,
              message: "הערך אינו תואם את התבנית הנדרשת",
            },
          })}
          className={cn(
            "w-full px-4 py-2 peer rounded-md",
            "focus:ring-indigo-800 outline-0",
            !field?.iconBefore && "pr-3",
            !field?.iconAfter && "pl-3",
            errors[field?.name] && "border-red-500",
            fieldsClassName,
            classNames?.input
          )}
        />

        {/* icon view-password */}
        {field?.viewPasswordIcon && (
          <div
            onClick={() => setViewPassword(!viewPassword)}
            className="flex-center cursor-pointer px-1"
          >
            <span className="p-1 rounded-md transition-all *:text-slate-300 hover:bg-slate-50 flex-center">
              {viewPassword ? <ViewOffSlashIcon /> : <ViewIcon />}
            </span>
          </div>
        )}

        {/* icon after */}
        {field?.iconAfter && (
          <span className="flex-center px-1.5 border-r *:text-slate-300">
            {field?.iconAfter}
          </span>
        )}

        {/* label */}
        <label
          htmlFor={field?.name}
          className={cn(
            "size-fit text-gray-400 bg-white transition-all",
            "absolute top-1/2 -translate-y-[135%] right-4",
            "peer-placeholder-shown:-translate-y-1/2",
            "peer-focus:text-indigo-800",
            value
              ? "peer-focus:-translate-y-[135%] right-2 scale-75 px-2"
              : "peer-focus:-translate-y-[135%] peer-focus:right-2 peer-focus:scale-75 peer-focus:px-2",
            field?.iconBefore && "peer-placeholder-shown:right-12",
            errors[field?.name] && "text-red-500",
            classNames?.label
          )}
        >
          {field?.label}
        </label>
      </div>

      {/* errors */}
      <div className="flex-center justify-end gap-2">
        {errors[field?.name] && (
          <span className="text-red-500 text-sm">
            {errors[field?.name]?.message}
          </span>
        )}
      </div>

      {/* helper text */}
      {field?.helperText}
    </>
  );
};

export default Input;
