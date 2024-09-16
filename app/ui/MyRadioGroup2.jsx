"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

export default function MyRadioGroup2() {
  const [selected, setSelected] = useState("");

  const options = [
    { name: "עד 100 רשומות", value: 50, description: "תוספת 50 ש׳׳ח" },
    { name: "עד 200 רשומות", value: 100, description: "תוספת 100 ש׳׳ח" },
    { name: "עד 300 רשומות", value: 150, description: "תוספת 150 ש׳׳ח" },
  ];

  return (
    <div className="w-full max-w-md space-y-2">
      {options.map((option, index) => {
        const isActive = selected === option?.value;

        return (
          <label
            key={index}
            className={cn(
              "w-full cursor-pointer p-4",
              "flex-center justify-between gap-2",
              "rounded-sm border",
              "transition-colors duration-200 ease-in-out",
              isActive
                ? "bg-indigo-50 border-indigo-200"
                : "border-slate-200 hover:bg-slate-50"
            )}
          >
            {/* name & circle */}
            <div className="flex-center gap-2">
              {/* circle */}
              <span
                className={cn(
                  "relative size-5",
                  "border rounded-full",
                  "transition-colors duration-200 ease-in-out",
                  isActive ? "bg-indigo-600" : "bg-white"
                )}
              >
                <input
                  type="radio"
                  name="options"
                  value={option?.value}
                  checked={isActive}
                  onChange={() => setSelected(option?.value)}
                  className="appearance-none"
                />
                {isActive && (
                  <span
                    className={cn(
                      "absolute-center size-[40%]",
                      "rounded-full bg-white"
                    )}
                  />
                )}
              </span>

              {/* name */}
              <span className={cn("", isActive && "text-indigo-600")}>
                {option?.name}
              </span>
            </div>

            {/* description */}
            <span>{option?.description}</span>
          </label>
        );
      })}
    </div>
  );
}
