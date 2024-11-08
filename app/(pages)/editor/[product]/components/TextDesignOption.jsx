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

const TextDesignOption = () => {
  const canvas = useAtomValue(canvas_Atom);
  const [activeObject, setActiveObject] = useState(null);
  console.log("activeObject: ", activeObject);

  useEffect(() => {
    if (!canvas) return;

    const getActiveObject = () => {
      const activeObj = canvas.getActiveObject();
      if (activeObj) {
        console.log("activeObj on created & updated: ", activeObj);
        setActiveObject(activeObj);
      } else {
        console.log("activeObj on cleared: ", activeObj);
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
      <FontSize />
      <LineHeight />
      <TextDesign />
      <AlignText />
      <AlignObjects />
    </div>
  );
};

export default TextDesignOption;
