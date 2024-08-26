"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { useForm } from "react-hook-form";

const MyForm = ({ children, title, formClassName, inputs, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  console.log("errors: ", errors);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        "h-fit w-96 p-4 border rounded flex flex-col gap-4 justify-between",
        formClassName
      )}
    >
      <h2 className="text-2xl text-center text-slate-400">{title}</h2>

      <div className="flex flex-col gap-4">
        {inputs.map((input, i) => {
          const value = watch(input?.type);

          return (
            <div key={i} className="relative">
              <input
                id={input?.type}
                type={input?.type}
                placeholder=" "
                {...register(input?.type, {
                  required: `${input?.label} הוא שדה חובה`,
                  pattern: input?.pattern && {
                    value: input?.pattern,
                    message: "הערך אינו תואם את התבנית הנדרשת",
                  },
                })}
                className={cn(
                  "w-full border px-4 py-2 peer",
                  errors[input?.type] && "border-red-500"
                )}
              />
              <label
                htmlFor={input?.type}
                className={cn(
                  "absolute right-2 top-2 px-2 bg-white text-gray-500 transition-all transform",
                  "peer-focus:-translate-y-5 peer-focus:scale-75",
                  value
                    ? "-translate-y-5 scale-75"
                    : "peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100",
                  errors[input?.type] && "text-red-500"
                )}
              >
                {input?.label}
              </label>
              {errors[input?.type] && (
                <span className="text-red-500 text-sm">
                  {errors[input?.type]?.message}
                </span>
              )}
            </div>
          );
        })}

        <button
          type="submit"
          className="w-full bg-indigo-800 text-indigo-50 px-4 py-2"
        >
          כניסה
        </button>
      </div>

      {children}
    </form>
  );
};

export default MyForm;
