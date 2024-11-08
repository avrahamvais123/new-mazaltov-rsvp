"use client";

import { canvas_Atom } from "@/lib/jotai";
import { useAtomValue } from "jotai";
import React, { Fragment, useEffect, useState } from "react";
import TextEditor from "./TextEditor";

const LayersOption = () => {
  const [layers, setLayers] = useState([]);
  const [activeObject, setActiveObject] = useState(null);
  console.log("layers: ", layers);
  const canvas = useAtomValue(canvas_Atom);

  useEffect(() => {
    if (!canvas) return;
    setLayers(canvas.getObjects());

    const activeObj = canvas?.getActiveObject();
    setActiveObject(activeObj);

    const handleObjectSelected = (e) => {
      const activeObj = e?.target;

      if (activeObj) {
        setActiveObject(activeObj);
      } else {
        setActiveObject(null);
      }
    };

    canvas?.on("selection:created", handleObjectSelected);
    canvas?.on("selection:updated", handleObjectSelected);
    canvas?.on("selection:cleared", handleObjectSelected);
    return () => {
      canvas?.off("selection:created", handleObjectSelected);
      canvas?.off("selection:updated", handleObjectSelected);
      canvas?.off("selection:cleared", handleObjectSelected);
    };
  }, [canvas]);

  useEffect(() => {
    console.log("activeObject?.id: ", activeObject?.id);
    console.log("layers: ", layers);
  }, [activeObject]);

  return (
    <div className="size-full overflow-auto flex-col-center justify-start gap-2">
      {layers.map((layer, i) => {
        const isObjectSelected = layer?.id === activeObject?.id;
        console.log("activeObject?.id: ", activeObject?.id);
        console.log("layer?.id: ", layer?.id);
        console.log("isObjectSelected: ", isObjectSelected);
        return (
          <Fragment key={i}>
            <TextEditor
              activeObject={layer}
              title={layer?.text ? "טקסט" : "עריכת טקסט"}
              classNames={{
                fieldset: isObjectSelected ? "border-indigo-600" : "",
                legend: isObjectSelected ? "border-indigo-600" : "",
              }}
            />
          </Fragment>
        );
      })}
    </div>
  );
};

export default LayersOption;
