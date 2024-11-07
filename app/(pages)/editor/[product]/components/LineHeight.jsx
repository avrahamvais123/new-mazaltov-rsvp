"use client";

import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { useAtomValue } from "jotai";
import { canvas_Atom } from "@/lib/jotai";

const LineHeight = () => {
  const [value, setValue] = useState(1.2);
  const canvas = useAtomValue(canvas_Atom);

  const updateLineHeight = (newLineHeight) => {
    setValue(newLineHeight);
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      activeObject.set("lineHeight", newLineHeight);
      canvas.renderAll();
    }
  };

  return (
    <fieldset className="w-full p-2 px-4 pt-1 border border-slate-700 rounded-sm flex-center gap-4">
      <legend className="px-2 text-xs text-slate-400">רווח בין השורות</legend>
      <p className="text-lg w-3/12 text-slate-400">{value}</p>
      <Slider
        defaultValue={[1.2]}
        onValueChange={(value) => updateLineHeight(value[0])} // מחלק ב-50 כדי לקבל ערך מתאים
        max={3}
        min={0.1}
        step={0.1}
        classNames={{
          track: "bg-slate-600",
          range: "bg-indigo-600",
          thumb: "cursor-pointer",
        }}
      />
    </fieldset>
  );
};

export default LineHeight;
