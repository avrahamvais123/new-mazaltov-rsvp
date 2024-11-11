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

  return (
    <div className="w-full h-fit overflow-auto grid grid-cols-2 auto-rows-auto justify-start gap-2">
      {layers.map((layer, i) => {
        const isObjectSelected = layer?.id === activeObject?.id;
        console.log("activeObject: ", activeObject);
        console.log("layer: ", layer);
        console.log("layer?.type: ", layer?.type);
        const textTypes = ["text", "i-text", "textbox"];

        if (layer?.type === "image" || layer?.type === "group") {
          return (
            <div
              key={i}
              className={`col-span-1 size-full aspect-square border-2 border-dashed border-gray-200 ${
                isObjectSelected ? "border-indigo-600" : ""
              }`}
              onClick={() => canvas?.setActiveObject(layer)}
            >
              <img
                src={layer?.src}
                alt="Layer"
                className="size-full object-cover"
              />
            </div>
          );
        } else if (textTypes.includes(layer?.type)) {
          return (
            <Fragment key={i}>
              <TextEditor
                activeObject={layer}
                title={layer?.text ? "טקסט" : "עריכת טקסט"}
                classNames={{
                  fieldset: isObjectSelected ? "col-span-2 border-indigo-600" : "col-span-2",
                  legend: isObjectSelected ? "text-indigo-600" : "",
                }}
              />
            </Fragment>
          );
        }
      })}
    </div>
  );
};

export default LayersOption;
