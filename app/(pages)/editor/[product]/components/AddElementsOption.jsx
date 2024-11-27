"use client";

import React from "react";
import UploadElements from "./UploadElements";
import { useAtomValue } from "jotai";
import { canvas_Atom } from "@/lib/jotai";
import { CircleIcon, SquareIcon } from "@/app/icons/huge-icons";
import { cn } from "@/lib/utils";
import { addCircle, addRect } from "./actions";

const buttonCn = cn(
  "size-full p-3 aspect-square",
  "flex-col-center rounded-sm transition-all",
  "bg-indigo-600 text-indigo-50",
  "hover:bg-indigo-700 active:bg-indigo-800"
);

const AddElementsOption = () => {
  const canvas = useAtomValue(canvas_Atom);

  return (
    <div className="w-full flex-col-center gap-2">
      <UploadElements />
      <div className="w-full grid grid-cols-2 auto-rows-auto gap-2">
        <button onClick={() => addRect({ canvas })} className={buttonCn}>
          <SquareIcon className="size-full text-indigo-50 fill-white" />
          <p className="">הוספת ריבוע</p>
        </button>
        <button onClick={() => addCircle({ canvas })} className={buttonCn}>
          <CircleIcon className="size-full text-indigo-50 fill-white" />
          <p className="">הוספת עיגול</p>
        </button>
      </div>
    </div>
  );
};

export default AddElementsOption;
