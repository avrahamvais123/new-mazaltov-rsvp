"use client";

import NumberInput from "@/app/ui/NumberInput";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useClickAway } from "react-use";

const FontSize = ({
  editor,
  size,
  setSize,
  showChangeFontSize,
  setShowChangeFontSize,
}) => {
  const ref = useRef();

  // Close FontSize when clicking outside of it
  useClickAway(ref, () => {
    setShowChangeFontSize(false);
  });

  const changeFontSize = (newSize) => {
    const activeObject = editor?.canvas?.getActiveObject();
    if (activeObject && activeObject.type === "text") {
      activeObject.set({
        fontSize: newSize,
        scaleX: 1,
        scaleY: 1,
      });
      editor?.canvas?.renderAll();
    }
  };

  useEffect(() => {
    const handleObjectScaling = () => {
      const activeObject = editor?.canvas?.getActiveObject();
      if (activeObject && activeObject.type === "text") {
        const newFontSize = (
          activeObject.fontSize * activeObject.scaleX
        ).toFixed(1);
        setSize(parseFloat(newFontSize));
      }
    };

    const handleObjectSelected = () => {
      const activeObject = editor?.canvas?.getActiveObject();
      if (activeObject && activeObject.type === "text") {
        // עדכון הגודל האמיתי של תיבת הטקסט שנבחרה
        const currentFontSize = activeObject.fontSize;
        setSize(parseFloat(currentFontSize.toFixed(1))); // הגדרת הגודל הנוכחי באינפוט לפי תיבת הטקסט
      }
    };

    // מאזינים לבחירה ושינוי גודל של תיבת טקסט
    editor?.canvas?.on("object:scaling", handleObjectScaling);
    editor?.canvas?.on("selection:created", handleObjectSelected);
    editor?.canvas?.on("selection:updated", handleObjectSelected);

    return () => {
      editor?.canvas?.off("object:scaling", handleObjectScaling);
      editor?.canvas?.off("selection:created", handleObjectSelected);
      editor?.canvas?.off("selection:updated", handleObjectSelected);
    };
  }, [editor, setSize]);

  return (
    <fieldset className="w-[9.9rem] p-2 pt-1 border border-slate-700 rounded-sm flex-center gap-2">
      <legend className="px-2 text-xs text-slate-400">גודל הגופן</legend>

      <NumberInput
        value={size}
        setValue={(newSize) => {
          setSize(newSize);
          changeFontSize(newSize);
        }}
        onDecrement={() => {
          const newSize = Math.max(size - 1, 1);
          setSize(newSize);
          changeFontSize(newSize);
        }}
        onIncrement={() => {
          const newSize = size + 1;
          setSize(newSize);
          changeFontSize(newSize);
        }}
        onInput={(e) => {
          const newSize = parseFloat(e.target.value);
          if (!isNaN(newSize)) {
            setSize(newSize);
            changeFontSize(newSize);
          }
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
