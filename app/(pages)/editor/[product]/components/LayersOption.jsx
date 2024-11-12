"use client";

import { canvas_Atom } from "@/lib/jotai";
import { useAtomValue } from "jotai";
import React, { Fragment, useEffect, useState } from "react";
import TextEditor from "./TextEditor";
import { cn } from "@/lib/utils";
import AnimatedComponent from "./AnimateComponent";

const TextLayer = ({ layer, isObjectSelected }) => {
  const textTypes = ["text", "i-text", "textbox"];

  if (textTypes.includes(layer?.type)) {
    return (
      <TextEditor
        activeObject={layer}
        title={layer?.text ? "טקסט" : "עריכת טקסט"}
        classNames={{
          fieldset: cn(isObjectSelected ? "border-indigo-600" : ""),
          legend: isObjectSelected ? "text-indigo-600" : "",
        }}
      />
    );
  }
};

const ShapeLayer = ({ layer, isObjectSelected }) => {
  if (layer?.type === "rect" || layer?.type === "circle") {
    return (
      <div
        className={cn(
          "size-full aspect-square",
          "border-2 border-dashed border-gray-200",
          isObjectSelected ? "border-indigo-600" : ""
        )}
        onClick={() => canvas?.setActiveObject(layer)}
      >
        <div
          className="size-full"
          style={{
            backgroundColor: layer?.fill,
            borderRadius: layer?.type === "circle" ? "50%" : "0",
          }}
        />
      </div>
    );
  }
};

const ImageLayer = ({ layer, isObjectSelected }) => {
  console.log("layer from image layer: ", layer);
  if (layer?.type === "image" || layer?.type === "group") {
    return (
      <div
        className={cn(
          "size-full p-2 aspect-square",
          "border-2 border-dashed border-gray-200",
          "transition-all",
          isObjectSelected ? "border-indigo-600" : ""
        )}
        onClick={() => canvas?.setActiveObject(layer)}
      >
        <img
          src={layer?.src}
          alt="Layer"
          className="size-full object-contain"
        />
      </div>
    );
  }
};
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
    <div className="size-full p-4 overflow-auto flex-col-center justify-start  gap-2">
      {layers.map((layer, i) => {
        const isObjectSelected = layer?.id === activeObject?.id;
        return (
          <Fragment key={i}>
            <TextLayer layer={layer} isObjectSelected={isObjectSelected} />
            <ImageLayer layer={layer} isObjectSelected={isObjectSelected} />
            <ShapeLayer layer={layer} isObjectSelected={isObjectSelected} />
          </Fragment>
        );
      })}
    </div>
  );
};

export default LayersOption;
