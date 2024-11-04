"use client";

import {
  TextBoldIcon,
  TextItalicIcon,
  TextUnderlineIcon,
} from "@/app/icons/icons";
import { editor_Atom } from "@/lib/jotai";
import { useAtomValue } from "jotai";
import React from "react";
import EditorButton from "./EditorButton";
import { cn } from "@/lib/utils";

const iconClassName = "group-hover:text-white";

const icons = [
  {
    Icon: TextBoldIcon,
    textStyle: "bold",
  },
  {
    Icon: TextUnderlineIcon,
    textStyle: "underline",
  },
  {
    Icon: TextItalicIcon,
    textStyle: "italic",
  },
];

const TextDesign = () => {
  const editor = useAtomValue(editor_Atom);

  const toggleTextStyle = (style) => {
    const activeObject = editor?.canvas?.getActiveObject();
    if (activeObject) {
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
    <fieldset className="w-full p-2 pt-1 border border-slate-700 rounded-sm flex-center gap-2">
      <legend className="px-2 text-xs text-slate-400">עיצוב טקסט</legend>
      <div className="flex-center gap-2">
        {icons.map(({ Icon, textStyle }, i) => {
          return (
            <EditorButton key={i}>
              <Icon onClick={() => toggleTextStyle(textStyle)} />
            </EditorButton>
          );
        })}
      </div>
    </fieldset>
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
