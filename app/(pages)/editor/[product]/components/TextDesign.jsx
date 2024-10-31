"use client";

import {
  TextBoldIcon,
  TextItalicIcon,
  TextUnderlineIcon,
} from "@/app/icons/icons";
import React, { useEffect, useState } from "react";
import ColorPicker from "./ColorPicker";
import { cn } from "@/lib/utils";
import FontSize from "./FontSize";

const TextDesign = ({
  editor,
  buttonClassName,
  activeObject,
  fontSize,
  setFontSize,
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#4f46e5");

  // Update selectedColor when activeObject changes
  useEffect(() => {
    console.log("activeObject: ", activeObject);
    if (activeObject) {
      const fillColor = activeObject.get("fill");
      setSelectedColor(fillColor);
    }
  }, [activeObject]);

  const toggleTextStyle = (style) => {
    if (activeObject && activeObject.type === "textbox") {
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
      editor.canvas.renderAll();
    }
  };

  return (
    <>
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

          {/* color picker button */}
          <div className="relative flex group">
            {showColorPicker && (
              <div className="absolute inset-0 size-full cursor-pointer" />
            )}
            <button
              className={cn(
                buttonClassName,
                "size-full p-1.5 flex group-hover:bg-slate-600 group-active:bg-slate-500"
              )}
              onClick={() => setShowColorPicker(!showColorPicker)}
            >
              <span
                style={{
                  backgroundColor: selectedColor,
                }}
                className="size-full bg-white rounded-sm"
              />
            </button>
          </div>
        </div>
      </fieldset>

      <FontSize editor={editor} size={fontSize} setSize={setFontSize} />

      {/* color picker */}
      <ColorPicker
        editor={editor}
        showColorPicker={showColorPicker}
        setShowColorPicker={setShowColorPicker}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        activeObject={activeObject}
      />
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
