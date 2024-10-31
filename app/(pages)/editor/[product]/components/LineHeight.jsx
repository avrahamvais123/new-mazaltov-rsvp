"use client";

import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";

const LineHeight = ({ editor }) => {
  const [value, setValue] = useState(1.2);

  const updateLineHeight = (newLineHeight) => {
    setValue(newLineHeight);
    if (!editor) return;
    console.log("newLineHeight: ", newLineHeight);
    const { canvas } = editor;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      activeObject.set("lineHeight", newLineHeight);
      canvas.renderAll();
    }
  };

  return (
    <fieldset className="w-[9.9rem] p-2 pt-1 border border-slate-700 rounded-sm flex-col-center gap-2">
      <legend className="px-2 text-xs text-slate-400">רווח בין השורות</legend>
      <p className="text-lg text-slate-400">{value}</p>
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
