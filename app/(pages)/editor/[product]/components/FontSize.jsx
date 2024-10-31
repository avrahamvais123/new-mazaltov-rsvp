"use client";

import NumberInput from "@/app/ui/NumberInput";
import React, { useState, useEffect } from "react";

const FontSize = ({ editor }) => {
  const [size, setSize] = useState(60);

  useEffect(() => {
    if (!editor) return;
    const { canvas } = editor;

    const updateFontSize = () => {
      const activeObject = canvas.getActiveObject();
      if (!activeObject) return;

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
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        const fontSize = Math.round(activeObject.fontSize);
        setSize(fontSize);
      }
    };

    // מאזין ליצירת אובייקט חדש ובחירה אוטומטית שלו
    canvas.on("object:added", (e) => {
      const newObject = e.target;
      if (newObject) {
        canvas.setActiveObject(newObject);
        updateInputNumber();
      }
    });

    canvas.on("mouse:down", updateInputNumber);
    canvas.on("selection:created", updateInputNumber);
    canvas.on("object:scaling", updateFontSize);

    return () => {
      canvas.off("mouse:down", updateInputNumber);
      canvas.off("selection:created", updateInputNumber);
      canvas.off("object:added");
      canvas.off("object:scaling", updateFontSize);
    };
  }, [editor]);

  // פונקציה לעדכון גודל הפונט בקנבס
  const handleFontSizeChange = (newSize) => {
    const { canvas } = editor;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      activeObject.set("fontSize", newSize);
      setSize(newSize);
      canvas.renderAll();
    }
  };

  return (
    <fieldset className="w-[9.9rem] p-2 pt-1 border border-slate-700 rounded-sm flex-center gap-2">
      <legend className="px-2 text-xs text-slate-400">גודל הגופן</legend>

      <NumberInput
        value={size}
        setValue={(newSize) => {
          setSize(newSize);
          handleFontSizeChange(newSize);
        }}
        onDecrement={() => {
          const newSize = size - 1;
          handleFontSizeChange(newSize);
        }}
        onIncrement={() => {
          const newSize = size + 1;
          handleFontSizeChange(newSize);
        }}
        onInput={(e) => {
          const newSize = parseFloat(e.target.value);
          handleFontSizeChange(newSize);
        }}
        classNames={{
          wrapper: "rounded-sm p-0 w-full bg-slate-800 border-none",
          input: "h-8 w-full bg-transparent text-slate-400 rounded-sm",
          buttons: "rounded-sm size-full size-8 aspect-square border-slate-600",
          buttonDecrement: "",
        }}
      />
    </fieldset>
  );
};

export default FontSize;
