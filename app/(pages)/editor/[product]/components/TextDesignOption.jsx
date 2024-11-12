"use client";

import React, { useEffect, useState } from "react";
import FontSize from "./FontSize";
import LineHeight from "./LineHeight";
import TextDesign from "./TextDesign";
import AlignText from "./AlignText";
import AlignObjects from "./AlignObjects";
import { useAtomValue } from "jotai";
import { canvas_Atom } from "@/lib/jotai";
import { addText } from "./actions";
import { cn } from "@/lib/utils";
import TextEditor from "./TextEditor";
import FontFamily from "./FontFamily";
import LetterSpacing from "./LetterSpacing";

const TextDesignOption = () => {
  const canvas = useAtomValue(canvas_Atom);
  const [activeObject, setActiveObject] = useState(null);

  useEffect(() => {
    if (!canvas) return;

    const getActiveObject = () => {
      const activeObj = canvas.getActiveObject();
      if (activeObj) {
        setActiveObject(activeObj);
      } else {
        setActiveObject(null);
      }
    };

    canvas.on("selection:created", getActiveObject);
    canvas.on("selection:updated", getActiveObject);
    canvas.on("selection:cleared", getActiveObject);

    return () => {
      canvas.off("selection:created", getActiveObject);
      canvas.off("selection:updated", getActiveObject);
      canvas.off("selection:cleared", getActiveObject);
    };
  }, [canvas]);

  return (
    <div className="size-full bg-slate-800 overflow-auto p-6 max-w-60 flex-col-center justify-start gap-2">
      <button
        onClick={() => addText({ canvas })}
        className={cn(
          "w-full px-4 py-2",
          "rounded-sm bg-indigo-600 text-indigo-50",
          "hover:brightness-90 active:brightness-75 transition-all"
        )}
      >
        הוסף טקסט
      </button>
      <TextEditor activeObject={activeObject} />
      <FontFamily />
      <FontSize />
      <LineHeight />
      <LetterSpacing />
      <TextDesign />
      <AlignText />
      <AlignObjects />
    </div>
  );
};

export default TextDesignOption;
