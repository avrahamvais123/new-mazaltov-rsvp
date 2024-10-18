"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { BounceLoader, PulseLoader as Pulse } from "react-spinners";
import colors from "tailwindcss/colors";

const c = "#6366F1";

export const PulseLoader = ({
  classNames,
  color = c,
  isLoading = false,
  text,
}) => {
  return (
    <>
      {isLoading && (
        <div
          className={cn(
            "z-50 fixed inset-0",
            "flex-col-center gap-4 bg-indigo-950/50",
            classNames?.wrapper
          )}
        >
          <Pulse
            className={cn(classNames?.loader)}
            color={color}
            loading={isLoading}
          />
          ;<h2 className="font-bold text-4xl text-indigo-50">{text}</h2>
        </div>
      )}
    </>
  );
};

const Loader = ({
  classNames,
  color = colors.indigo[500],
  isLoading = false,
  text,
}) => {
  return (
    <>
      {isLoading && (
        <div
          className={cn(
            "z-50 fixed inset-0",
            "flex-col-center gap-4 bg-indigo-950/50",
            classNames?.wrapper
          )}
        >
          <BounceLoader
            className={cn(classNames?.loader)}
            color={color}
            loading={isLoading}
          />
          <h2 className="font-bold text-4xl text-indigo-50">{text}</h2>
        </div>
      )}
    </>
  );
};

export default Loader;
