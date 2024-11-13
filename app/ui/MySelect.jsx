"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const MySelect = ({
  field,
  value,
  errors,
  setValue = () => {},
  defaultValue,
  classNames = {},
  placeholder,
}) => {
  return (
    <div className=" relative w-full">
      <Select
        dir="rtl"
        defaultValue={defaultValue}
        required={field?.required ? true : false}
        value={value} // הוספתי חדש כדי לשלוט מבחוץ על הערך שלו
        onValueChange={(val) => setValue(field?.name, val)}
      >
        <SelectTrigger
          className={cn(
            "w-full border border-slate-300 px-4 py-5 rounded-md text-md shadow-none",
            classNames?.trigger
          )}
        >
          <SelectValue placeholder={placeholder || " "} />
        </SelectTrigger>
        <SelectContent className={cn("rounded-sm", classNames?.content)}>
          {field?.options.map((option, index) => (
            <SelectItem
              key={index}
              value={option.value}
              className={cn("rounded-sm", classNames?.option)}
            >
              {option?.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <label
        htmlFor={field?.name}
        className={cn(
          "absolute right-0 top-2 mx-4 text-gray-400 transition-all transform",
          value
            ? "bg-white -translate-y-5 scale-75 px-2 mx-0"
            : "bg-white peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100",
          classNames?.label
        )}
      >
        {field?.label}
      </label>
      {errors && errors[field?.name] && (
        <span className={cn("text-red-500 text-sm", classNames?.error)}>
          {errors[field?.name]?.message}
        </span>
      )}
    </div>
  );
};

export default MySelect;
