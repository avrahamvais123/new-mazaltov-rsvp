"use client";

import React from "react";
import UploadElements from "./UploadElements";
import { useAtomValue } from "jotai";
import { canvas_Atom } from "@/lib/jotai";
import { CircleIcon, SquareIcon } from "@/app/icons/icons";
import { cn } from "@/lib/utils";

const buttonCn = cn(
  "size-full p-3 aspect-square",
  "flex-col-center rounded-sm transition-all",
  "bg-indigo-600 text-indigo-50",
  "hover:bg-indigo-700 active:bg-indigo-800"
);

const AddElementsOption = () => {
  const canvas = useAtomValue(canvas_Atom);

  const addRect = () => {
    if (!fabric || !canvas) return;
    const rect = new fabric.Rect({
      width: 100,
      height: 100,
      left: canvas.width / 2, // מרכז התיבה
      top: canvas.height / 2,
      fill: "white",
    });
    canvas.add(rect);
    canvas.renderAll();
  };

  const addCircle = () => {
    if (!fabric || !canvas) return;
    const circle = new fabric.Circle({
      radius: 50, // הגדרת רדיוס במקום רוחב וגובה
      fill: "white",
      left: canvas.width / 2, // מרכז התיבה
      top: canvas.height / 2,
    });
    canvas.add(circle);
    canvas.renderAll();
  };

  return (
    <div className="w-full flex-col-center gap-2">
      <UploadElements />
      <div className="w-full grid grid-cols-2 auto-rows-auto gap-2">
        <button onClick={addRect} className={buttonCn}>
          <SquareIcon className="size-full text-indigo-50 fill-white" />
          <p className="">הוספת ריבוע</p>
        </button>
        <button onClick={addCircle} className={buttonCn}>
          <CircleIcon className="size-full text-indigo-50 fill-white" />
          <p className="">הוספת עיגול</p>
        </button>
      </div>
    </div>
  );
};

export default AddElementsOption;
