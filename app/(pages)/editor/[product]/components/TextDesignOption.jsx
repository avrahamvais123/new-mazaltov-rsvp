"use client";

import React, { useEffect, useState } from "react";
import ColorPicker from "./ColorPicker";
import FontSize from "./FontSize";
import LineHeight from "./LineHeight";
import TextDesign from "./TextDesign";
import AlignText from "./AlignText";
import AlignObjects from "./AlignObjects";
import { useAtomValue } from "jotai";
import { canvas_Atom } from "@/lib/jotai";

const TextDesignOption = () => {
  const canvas = useAtomValue(canvas_Atom);
  const [selectedColor, setSelectedColor] = useState("#4f46e5");

  return (
    <div>
      <div className="size-full bg-slate-800 overflow-auto p-6 max-w-60 flex-col-center justify-start gap-2">
        <ColorPicker
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
        <FontSize />
        <LineHeight />
        <TextDesign buttonClassName={buttonClassName} />
        <AlignText buttonClassName={buttonClassName} />
        <AlignObjects buttonClassName={buttonClassName} />
      </div>
    </div>
  );
};

export default TextDesignOption;
