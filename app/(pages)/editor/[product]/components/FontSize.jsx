"use client";

import NumberInput from "@/app/ui/NumberInput";
import { canvas_Atom } from "@/lib/jotai";
import { useAtomValue } from "jotai";
import React, { useState, useEffect } from "react";

const FontSize = () => {
  const [size, setSize] = useState(60);
  const canvas = useAtomValue(canvas_Atom);

  useEffect(() => {
    if (!canvas) return;

    const updateFontSize = () => {
      const objectTypes = ["text", "i-text", "textbox"];
      const activeObject = canvas.getActiveObject();

      if (!activeObject || !objectTypes.includes(activeObject?.type)) return;

      const originalFontSize = activeObject.fontSize;
      const newFontSize = Math.round(originalFontSize * activeObject.scaleX);

      activeObject.set({
        fontSize: newFontSize,
        scaleX: 1,
        scaleY: 1,
      });

      setSize(newFontSize);
      activeObject.setCoords();
      canvas.renderAll();
    };

    const updateInputNumber = () => {
      const objectTypes = ["text", "i-text", "textbox"];
      const activeObject = canvas.getActiveObject();

      if (!activeObject || !objectTypes.includes(activeObject?.type)) return;

      const originalFontSize = activeObject.fontSize;
      const newFontSize = Math.round(originalFontSize * activeObject.scaleX);

      setSize(newFontSize);
    };

    const updateObjectAdded = (e) => {
      const newObject = e.target;
      if (newObject) {
        canvas.setActiveObject(newObject);
        updateInputNumber();
      }
    };

    canvas.on("object:added", updateObjectAdded);
    canvas.on("mouse:down", updateInputNumber);
    canvas.on("selection:created", updateInputNumber);
    canvas.on("object:scaling", updateFontSize);

    return () => {
      canvas.off("object:added", updateObjectAdded);
      canvas.off("mouse:down", updateInputNumber);
      canvas.off("selection:created", updateInputNumber);
      canvas.off("object:scaling", updateFontSize);
    };
  }, [canvas]);

  const handleFontSizeChange = (newSize) => {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      const roundedSize = Math.round(newSize); // עיגול הגודל למספר שלם
      activeObject.set("fontSize", roundedSize);
      setSize(roundedSize);
      canvas.renderAll();
    }
  };

  return (
    <fieldset className="w-full p-2 pt-1 border border-slate-700 rounded-sm flex-center gap-2">
      <legend className="px-2 text-xs text-slate-400">גודל הגופן</legend>

      <NumberInput
        max={Infinity}
        value={size}
        setValue={(newSize) => {
          handleFontSizeChange(newSize);
        }}
        onDecrement={() => handleFontSizeChange(size - 1)}
        onIncrement={() => handleFontSizeChange(size + 1)}
        onInput={(e) => handleFontSizeChange(parseFloat(e.target.value))}
        classNames={{
          wrapper: "rounded-sm p-0 w-full bg-slate-800 border-none",
          input: "h-8 w-full bg-transparent text-slate-400 rounded-sm",
          buttons: "rounded-sm size-full size-8 aspect-square border-slate-600",
        }}
      />
    </fieldset>
  );
};

export default FontSize;
