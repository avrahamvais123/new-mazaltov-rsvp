"use client";

import {
  PaintBucketIcon,
  TextBoldIcon,
  TextItalicIcon,
  TextSmallcapsIcon,
  TextUnderlineIcon,
} from "@/app/icons/icons";
import React, { useState } from "react";
import ColorPicker from "./ColorPicker";
import { cn } from "@/lib/utils";

const TextDesign = ({ editor, buttonClassName }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#333");
  const currentColor = `hsla(${selectedColor.h}, ${selectedColor.s * 100}%, ${
    selectedColor.l * 100
  }%, ${selectedColor.a})`;
  console.log("selectedColor: ", selectedColor);

  const toggleTextStyle = (style) => {
    const activeObject = editor?.canvas?.getActiveObject();
    if (activeObject && activeObject.type === "text") {
      switch (style) {
        case "bold":
          activeObject.set(
            "fontWeight",
            activeObject.fontWeight === "bold" ? "normal" : "bold"
          );
          break;
        case "underline":
          activeObject.set("underline", !activeObject.underline);
          break;
        case "italic":
          activeObject.set(
            "fontStyle",
            activeObject.fontStyle === "italic" ? "normal" : "italic"
          );
          break;
        default:
          break;
      }
      editor.canvas.renderAll(); // רענון הקנבס לאחר שינוי
    }
  };

  return (
    <>
      {/* color picker */}
      <ColorPicker
        editor={editor}
        showColorPicker={showColorPicker}
        setShowColorPicker={setShowColorPicker}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />

      <fieldset className="p-2 pt-1 border border-slate-700 rounded-sm flex-center gap-2">
        <legend className="px-2 text-xs text-slate-400">עיצוב טקסט</legend>
        <div className="grid grid-cols-3 grid-rows-2 gap-2">
          <TextBoldIcon
            className={buttonClassName}
            onClick={() => toggleTextStyle("bold")}
          />
          <TextUnderlineIcon
            className={buttonClassName}
            onClick={() => toggleTextStyle("underline")}
          />
          <TextItalicIcon
            className={buttonClassName}
            onClick={() => toggleTextStyle("italic")}
          />
          {/* color picker */}
          <div className="relative flex group">
            {showColorPicker && (
              <div className="absolute inset-0 cursor-pointer" />
            )}
            <button
              className={cn(
                buttonClassName,
                "size-full p-1.5 flex group-hover:bg-slate-600 group-active:bg-slate-500"
              )}
              onClick={() => {
                setShowColorPicker(!showColorPicker);
              }}
            >
              <span
                style={{
                  backgroundColor: currentColor,
                }}
                className="size-full bg-white rounded-sm"
              ></span>
            </button>
          </div>
          <TextSmallcapsIcon className={buttonClassName} onClick={() => {}} />
          <TextSmallcapsIcon className={buttonClassName} onClick={() => {}} />
        </div>
      </fieldset>
    </>
  );
};

export default TextDesign;

{
  /* <PaintBucketIcon
              className={cn(
                buttonClassName,
                "group-hover:bg-slate-600 group-active:bg-slate-500"
              )}
              onClick={() => {
                setShowColorPicker(!showColorPicker);
              }}
            /> */
}
