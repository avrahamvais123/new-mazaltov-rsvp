"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { BounceLoader } from "react-spinners";

const c = "#6366F1";

const Loader = ({ className, color = "6366F1", isLoading = false }) => {
  return (
    <BounceLoader className={cn(className)} color={color} loading={isLoading} />
  );
};

export default Loader;
