"use client";

import { editor_Atom } from "@/lib/jotai";
import { useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";

const LayersOption = () => {
  const [layers, setLayers] = useState([]);
  const editor = useAtomValue(editor_Atom);

  useEffect(() => {
    if (!editor) return;
    const { canvas } = editor;
    setLayers(canvas.getObjects());
  }, [editor]);

  return (
    <div className="size-full flex-col-center justify-start gap-2">
      {layers.map((layer, i) => {
        return (
          <div key={i} className="w-full h-10 bg-slate-800 brightness-90 flex-center rounded-sm">
            {layer?.text}
          </div>
        );
      })}
    </div>
  );
};

export default LayersOption;
