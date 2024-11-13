"use client";

import { cn } from "@/lib/utils";
import React from "react";

const FlipCanvas = ({ frontContent, backContent, isFlipped, sizes }) => {
  return (
    <>
      <div style={{ ...sizes, perspective: "1000px" }} className="size-full">
        <div
          className={cn(
            "relative size-full transition-transform duration-700"
          )}
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "",
          }}
        >
          {/* Front Side */}
          <div
            className="absolute-center size-full"
            style={{
              backfaceVisibility: "hidden",
            }}
          >
            {frontContent}
          </div>

          {/* Back Side */}
          <div
            className="absolute top-0 left-0 size-full flex-center"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            {backContent}
          </div>
        </div>
      </div>
    </>
  );
};

export default FlipCanvas;
