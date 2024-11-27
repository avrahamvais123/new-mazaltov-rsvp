"use client";

import {
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from "@/app/icons/huge-icons";
import React from "react";
import EditorButton from "./EditorButton";
import { useAtomValue } from "jotai";
import { canvas_Atom } from "@/lib/jotai";

const icons = [
  {
    Icon: TextAlignRightIcon,
    align: "right",
  },
  {
    Icon: TextAlignCenterIcon,
    align: "center",
  },
  {
    Icon: TextAlignLeftIcon,
    align: "left",
  },
];

const AlignText = () => {
  const canvas = useAtomValue(canvas_Atom);

  const textAlign = (align) => {
    const activeObject = canvas?.getActiveObject();
    if (activeObject) {
      console.log("activeObject: ", activeObject);
      activeObject.set("textAlign", align); // שינוי יישור הטקסט
      canvas?.renderAll(); // רענון הקנבס לאחר שינוי
    }
  };
  
  return (
    <fieldset className="w-full p-2 pt-1 border border-slate-700 rounded-sm flex-center gap-2">
      <legend className="px-2 text-xs text-slate-400">יישור טקסט</legend>
      {icons.map(({ Icon, align }, i) => {
        return (
          <EditorButton key={i}>
            <Icon onClick={() => textAlign(align)} />
          </EditorButton>
        );
      })}
    </fieldset>
  );
};

export default AlignText;
