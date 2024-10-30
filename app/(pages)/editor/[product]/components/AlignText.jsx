"use client";

import {
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from "@/app/icons/icons";
import React from "react";

const AlignText = ({ editor, buttonClassName }) => {
  const textAlign = (align) => {
    const activeObject = editor?.canvas?.getActiveObject();
    if (activeObject && activeObject.type === "text") {
      console.log("activeObject: ", activeObject);
      activeObject.set("textAlign", align); // שינוי יישור הטקסט
      editor?.canvas?.renderAll(); // רענון הקנבס לאחר שינוי
    }
  };
  return (
    <fieldset className="p-2 pt-1 border border-slate-700 rounded-sm flex-center gap-2">
      <legend className="px-2 text-xs text-slate-400">יישור טקסט</legend>
      <TextAlignRightIcon
        className={buttonClassName}
        onClick={() => textAlign("right")}
      />
      <TextAlignCenterIcon
        className={buttonClassName}
        onClick={() => textAlign("center")}
      />
      <TextAlignLeftIcon
        className={buttonClassName}
        onClick={() => textAlign("left")}
      />
    </fieldset>
  );
};

export default AlignText;
