"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { BounceLoader, PulseLoader as Pulse } from "react-spinners";

const c = "#6366F1";

export const PulseLoader = ({ className, color = c, isLoading = false }) => {
  return (
    <Pulse className={cn(className)} color={color} loading={isLoading} />
  );
}

const Loader = ({ className, color = "6366F1", isLoading = false }) => {
  return (
    <BounceLoader className={cn(className)} color={color} loading={isLoading} />
  );
};

export default Loader;
