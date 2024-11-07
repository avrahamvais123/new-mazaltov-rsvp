"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";

const FlipCanvas = ({ frontContent, backContent, isFlipped, sizes }) => {
  return (
    <div style={{ ...sizes }} className="size-full perspective-1000">
      <div
        className={cn(
          "relative size-full transition-transform duration-700 transform-style-3d",
          isFlipped ? "rotate-y-180" : ""
        )}
      >
        {/* Front Side */}
        <div className="absolute-center size-full backface-hidden flex-center">
          {frontContent}
        </div>

        {/* Back Side */}
        <div className="absolute-center size-full rotate-y-180 backface-hidden flex-center">
          {backContent}
        </div>
      </div>
    </div>
  );
};

export default FlipCanvas;
