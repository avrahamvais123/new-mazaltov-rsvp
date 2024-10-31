"use client";

import {
  TextBoldIcon,
  TextItalicIcon,
  TextUnderlineIcon,
} from "@/app/icons/icons";
import React from "react";

const TextDesign = ({ editor, buttonClassName, activeObject }) => {
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
        <div className="flex-center gap-2">
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
