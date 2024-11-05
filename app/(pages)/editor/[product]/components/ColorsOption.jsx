"use client";

import { editor_Atom } from "@/lib/jotai";
import { useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";
import ColorPicker from "./ColorPicker";
import { usePalette } from "color-thief-react";

const ColorsOption = () => {
  const editor = useAtomValue(editor_Atom);
  const [selectedColor, setSelectedColor] = useState("#4f46e5");
  const imageUrl = editor?.canvas?.backgroundImage?._element?.currentSrc;
  const { data: colors, loading, error } = usePalette(imageUrl, 12, "hex", {
    crossOrigin: "anonymous",
    quality: 1000, // אפשר להתאים את האיכות בהתאם לביצועים
  });

  useEffect(() => {
    if (!editor) return;
    const { canvas } = editor;

    const activeObject = canvas?.getActiveObject();

    if (activeObject) {
      activeObject.set("fill", selectedColor);
      canvas.renderAll();
    }

    const getObjectColor = () => {
      console.log("activeObject: ", activeObject);
      if (activeObject) {
        setSelectedColor(activeObject.fill);
      }
    };
    canvas.on("object:selected", getObjectColor);

    return () => {
      canvas.off("object:selected", getObjectColor);
    };
  }, [editor, selectedColor]);

  return (
    <div className="w-full flex-grow flex-col-center justify-start gap-2 overflow-auto">
      <ColorPicker
        imageColors={colors}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
      <div className="w-full grid grid-cols-6 auto-rows-auto justify-start self-start gap-1">
        {colors?.map((color, i) => {
          return (
            <button
              key={i}
              className="w-full aspect-square flex-center justify-center items-center bg-gray-300 rounded-sm"
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ColorsOption;
