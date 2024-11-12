"use client";

import React, { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { useAtomValue } from "jotai";
import { canvas_Atom } from "@/lib/jotai";

const LineHeight = () => {
  const [value, setValue] = useState(1.2); // ערך ברירת מחדל של רווח בין השורות
  const canvas = useAtomValue(canvas_Atom);

  useEffect(() => {
    if (!canvas) return;

    const handleSelection = () => {
      const activeObject = canvas.getActiveObject();
      const textType = ["text", "i-text", "textbox"];
      if (activeObject && textType.includes(activeObject.type)) {
        const currentLineHeight = activeObject.lineHeight || 1.2;
        setValue(currentLineHeight); // עדכון ערך הסליידר לרווח השורות הנוכחי
      }
    };

    // הוספת מאזינים לאירועי בחירה
    canvas.on("selection:created", handleSelection);
    canvas.on("selection:updated", handleSelection);

    return () => {
      canvas.off("selection:created", handleSelection);
      canvas.off("selection:updated", handleSelection);
    };
  }, [canvas]);

  const updateLineHeight = (newLineHeight) => {
    setValue(newLineHeight);
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    const textType = ["text", "i-text", "textbox"];
    if (activeObject && textType.includes(activeObject.type)) {
      activeObject.set("lineHeight", newLineHeight);
      canvas.renderAll();
    }
  };

  return (
    <fieldset className="w-full p-2 px-4 pt-1 border border-slate-700 rounded-sm flex-center gap-4">
      <legend className="px-2 text-xs text-slate-400">רווח בין השורות</legend>
      <p className="text-lg w-3/12 text-slate-400">{value}</p>
      <Slider
        value={[value]}
        onValueChange={(value) => updateLineHeight(value[0])}
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
