"use client";

import { cn } from "@/lib/utils";
import React from "react";

const Steps = ({ steps = [], current }) => {
  return (
    <div className="relative flex justify-center items-start gap-4 max-md:gap-2">
      {steps.map((step, i) => {
        const isActive = current === i + 1;
        return (
          <div
            key={i}
            className={cn(
              "w-full flex flex-col items-center justify-center gap-1",
              isActive ? "text-indigo-800" : "text-slate-400",
              "max-md:text-sm text-center"
            )}
          >
            <div
              className={cn(
                "size-10",
                "flex justify-center items-center",
                "rounded-full border border-slate-400",
                isActive
                  ? "text-indigo-50 border-indigo-800 bg-indigo-800"
                  : "text-slate-400",
                "max-md:size-8"
              )}
            >
              {i + 1}
            </div>

            <p className="text-sm max-md:text-xs">{step?.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Steps;
