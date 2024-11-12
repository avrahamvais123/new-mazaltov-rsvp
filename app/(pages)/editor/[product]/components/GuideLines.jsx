"use client";

import {
  showGuideLine_horizontal_Atom,
  showGuideLine_vertical_Atom,
} from "@/lib/jotai";
import { useAtomValue } from "jotai";
import React from "react";
import { sky } from "tailwindcss/colors";

const GuideLines = () => {
  const showGuideLine_vertical = useAtomValue(showGuideLine_vertical_Atom);
  const showGuideLine_horizontal = useAtomValue(showGuideLine_horizontal_Atom);

  return (
    <>
      {showGuideLine_horizontal && (
        <svg width="100%" height="2" className="z-10 absolute-center w-full">
          <line
            x1="0"
            y1="1"
            x2="100%"
            y2="1"
            stroke={sky[500]}
            strokeWidth="2"
            strokeDasharray="5,5"
          />
        </svg>
      )}
      {showGuideLine_vertical && (
        <svg
          width="2"
          height="100%"
          className="z-10 absolute-center"
          style={{ display: "block", margin: "0 auto" }}
        >
          <line
            x1="1"
            y1="0"
            x2="1"
            y2="100%"
            stroke={sky[500]}
            strokeWidth="2"
            strokeDasharray="5,5"
          />
        </svg>
      )}
    </>
  );
};

export default GuideLines;
