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
}) => {
  return (
    <>
      <Select
        dir="rtl"
        defaultValue={defaultValue}
        required={field?.required ? true : false}
        onValueChange={(val) => setValue(field?.name, val)}
      >
        <SelectTrigger className="w-full border px-4 py-5 rounded-none text-md shadow-none">
          <SelectValue placeholder=" " />
        </SelectTrigger>
        <SelectContent className="rounded-sm">
          {field?.options.map((option, index) => (
            <SelectItem key={index} value={option.value} className="rounded-sm">
              {option.label}
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
            : "bg-white peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100"
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

export default MySelect;
