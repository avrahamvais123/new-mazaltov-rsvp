"use client";

import Input from "@/app/ui/Input";
import MyForm from "@/app/ui/MyForm";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const fields = [
  {
    name: "name",
    label: "שם",
    type: "text",
    required: true,
  },
  {
    type: "radioGroup",
    name: "attending",
    options: [
      {
        text: "מגיעים",
        value: "מגיעים",
      },
      {
        text: "אולי מגיעים",
        value: "אולי מגיעים",
      },
      {
        text: "לא מגיעים",
        value: "לא מגיעים",
      },
    ],
    classNames: {
      wrapper: "",
    },
  },
  {
    name: "name",
    label: "שם",
    type: "textarea",
    required: true,
  },
];

const AttendingButtons = [
  {
    value: "מגיעים",
    className: "",
  },
  {
    value: "אולי מגיעים",
    className: "",
  },
  {
    value: "לא מגיעים",
    className: "",
  },
];

const FloatingInput = ({ className, ...props }) => {
  return (
    <div className={cn("relative", className)}>
      <input
        {...props}
        className={cn(
          "w-full px-4 py-2 border rounded-md focus:ring-indigo-800 outline-0"
        )}
      />
      <label
        htmlFor={props.id}
        className={cn(
          "absolute top-0 left-0 text-slate-400 text-xs",
          props.error && "text-red-600"
        )}
      >
        {props.label}
      </label>
    </div>
  );
};

const InvitaionForm = () => {
  const { getValues, reset, register, handleSubmit, watch } = useForm({
    defaultValues: {
      attending: "מגיעים",
    },
  });

  const options = [
    {
      id: 1,
      value: "מגיעים",
      className: ({ isActive }) =>
        cn(
          isActive
            ? "border-green-600 bg-green-600 text-white"
            : "border-green-600 text-green-600"
        ),
    },
    {
      id: 2,
      value: "אולי מגיעים",
      className: ({ isActive }) =>
        cn(
          isActive
            ? "border-slate-400 bg-slate-400 text-slate-600"
            : "border-slate-400 text-slate-800"
        ),
    },
    {
      id: 3,
      value: "לא מגיעים",
      className: ({ isActive }) =>
        cn(
          isActive
            ? "border-red-600 bg-red-600 text-white"
            : "border-red-600 text-red-600"
        ),
    },
  ];

  const onSubmit = (data) => {
    console.log("data: ", data);
    reset();
  };

  return (
    <fieldset className="w-full max-w-[500px] p-4 flex-col-center gap-4  border rounded-md">
      <legend className="px-4 text-lg font-bold text-slate-400">
        אישורי הגעה
      </legend>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="size-full flex-col-center gap-4"
      >
        <label className="w-full flex-col-center items-start text-slate-400">
          שם
          <input
            className="w-full px-4 py-2 border rounded-md ring-1 ring-transparent transition-all focus:ring-indigo-800 outline-0"
            {...register("name", { required: true })}
          />
        </label>

        <label className="w-full flex-col-center items-start text-slate-400">
          אישורי הגעה
          <div className="w-full flex-col-center md:flex-row gap-2">
            {options.map((option) => {
              const isActive = watch("attending") == option.value;
              return (
                <label key={option.value} className="w-full cursor-pointer">
                  <input
                    type="radio"
                    value={option.value}
                    {...register("attending", { required: true })}
                    className="hidden"
                  />
                  <div
                    className={cn(
                      "w-full px-4 py-2 text-center rounded-md border transition-all",
                      isActive
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                      /* option.className({ isActive }) */
                    )}
                  >
                    {option.value}
                  </div>
                </label>
              );
            })}
          </div>
        </label>

        <label className="w-full flex-col-center items-start text-slate-400">
          ברכות ואיחולים
          <textarea
            rows="4"
            {...register("congratulations", { required: true })}
            className="resize-none border w-full rounded-md ring-1 ring-transparent transition-all focus:ring-indigo-800 outline-0"
          ></textarea>
        </label>

        <button className="bg-indigo-600 text-white py-2 px-4 rounded-md w-full">
          שלח
        </button>
      </form>
    </fieldset>
  );
};

export default InvitaionForm;
