"use client";

import React, { useEffect, useState } from "react";
import FontSize from "./FontSize";
import LineHeight from "./LineHeight";
import TextDesign from "./TextDesign";
import AlignText from "./AlignText";
import AlignObjects from "./AlignObjects";
import { useAtomValue } from "jotai";
import { editor_Atom } from "@/lib/jotai";
import { addText } from "./actions";

const TextDesignOption = () => {
  const editor = useAtomValue(editor_Atom);

  return (
    <div className="size-full bg-slate-800 overflow-auto p-6 max-w-60 flex-col-center justify-start gap-2">
      <button onClick={() => addText({ editor })} className="">הוסף טקסט</button>
      <FontSize />
      <LineHeight />
      <TextDesign />
      <AlignText />
      <AlignObjects />
    </div>
  );
};

export default TextDesignOption;
