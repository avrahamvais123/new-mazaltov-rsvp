"use client";

import React from "react";
import UploadElements from "./UploadElements";
import { useAtomValue } from "jotai";
import { canvas_Atom } from "@/lib/jotai";

const AddElementsOption = () => {
  const canvas = useAtomValue(canvas_Atom);
  const addRect = () => {
    if (!fabric || !canvas) return;
    const rect = new fabric.Rect({
      width: 100,
      height: 100,
      fill: "red",
    });
    canvas.add(rect);
    canvas.renderAll();
  };
  return (
    <div className="w-full flex-center gap-2">
      <button onClick={addRect} className="">
        add rect
      </button>
      <UploadElements />
    </div>
  );
};

export default AddElementsOption;
