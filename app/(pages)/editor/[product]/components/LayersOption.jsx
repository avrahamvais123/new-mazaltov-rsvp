"use client";

import { canvas_Atom } from "@/lib/jotai";
import { useAtomValue } from "jotai";
import React, { Fragment, useEffect, useState } from "react";
import TextEditor from "./TextEditor";

const LayersOption = () => {
  const [layers, setLayers] = useState([]);
  console.log("layers: ", layers);
  const canvas = useAtomValue(canvas_Atom);

  useEffect(() => {
    if (!canvas) return;
    setLayers(canvas.getObjects());
  }, [canvas]);

  return (
    <div className="size-full overflow-auto flex-col-center justify-start gap-2">
      {layers.map((layer, i) => {
        return (
          <Fragment key={i}>
            <TextEditor
              activeObject={layer}
              title={layer?.text ? "טקסט" : "עריכת טקסט"}
              classNames={{}}
            />
          </Fragment>
        );
      })}
    </div>
  );
};

export default LayersOption;
