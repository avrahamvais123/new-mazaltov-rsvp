"use client";

import { canvas_Atom } from "@/lib/jotai";
import { useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";

const LayersOption = () => {
  const [layers, setLayers] = useState([]);
  const canvas = useAtomValue(canvas_Atom);

  useEffect(() => {
    if (!canvas) return;
    setLayers(canvas.getObjects());
  }, [canvas]);

  return (
    <div className="size-full flex-col-center justify-start gap-2">
      {layers.map((layer, i) => {
        return (
          <div
            key={i}
            className="w-full h-10 bg-slate-800 brightness-90 flex-center rounded-sm"
          >
            {layer?.text}
          </div>
        );
      })}
    </div>
  );
};

export default LayersOption;
