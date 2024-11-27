"use client";

import {
  AlignBottomIcon,
  AlignHorizontalCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  AlignTopIcon,
  AlignVerticalCenterIcon,
} from "@/app/icons/huge-icons";
import React from "react";
import EditorButton from "./EditorButton";
import { useAtomValue } from "jotai";
import { canvas_Atom } from "@/lib/jotai";

const icons = [
  {
    Icon: AlignRightIcon,
    align: "right",
    mode: "horizon",
  },
  {
    Icon: AlignHorizontalCenterIcon,
    align: "center",
    mode: "horizon",
  },
  {
    Icon: AlignLeftIcon,
    align: "left",
    mode: "horizon",
  },
  {
    Icon: AlignTopIcon,
    align: "top",
    mode: "vertical",
  },
  {
    Icon: AlignVerticalCenterIcon,
    align: "center",
    mode: "vertical",
  },
  {
    Icon: AlignBottomIcon,
    align: "bottom",
    mode: "vertical",
  },
];

const AlignObjects = () => {
  const canvas = useAtomValue(canvas_Atom);

  const alignToHorizontally = (position) => {
    if (!canvas) return;
    const activeObject = canvas?.getActiveObject();
    if (activeObject) {
      const canvasWidth = canvas.width;
      const objectWidth = activeObject.getScaledWidth();
      console.log("activeObject: ", activeObject);
      console.log("canvasWidth: ", canvasWidth);
      console.log("objectWidth: ", objectWidth);
      console.log("fabric: ", fabric);

      switch (position) {
        case "left":
          activeObject.set({
            left: 0,
            originX: "left",
          });
          break;
        case "center":
          activeObject.set({
            left: canvasWidth / 2 - objectWidth / 2,
            originX: "left",
          });
          break;
        case "right":
          activeObject.set({
            left: canvasWidth - objectWidth,
            originX: "left",
          });
          break;
        default:
          break;
      }
      activeObject.setCoords(); // עדכון הקואורדינטות לאחר שינוי
      canvas.renderAll(); // רענון הקנבס
    }
  };

  const alignToVertically = (position) => {
    if (!canvas) return;
    const activeObject = canvas?.getActiveObject();
    if (activeObject) {
      const canvasHeight = canvas.height;
      const objectHeight = activeObject.getScaledHeight();

      switch (position) {
        case "top":
          activeObject.set({
            top: 0,
            originY: "top",
          });
          break;
        case "center":
          activeObject.set({
            top: canvasHeight / 2 - objectHeight / 2,
            originY: "top",
          });
          break;
        case "bottom":
          activeObject.set({
            top: canvasHeight - objectHeight,
            originY: "top",
          });
          break;
        default:
          break;
      }
      activeObject.setCoords(); // עדכון הקואורדינטות לאחר שינוי
      canvas.renderAll(); // רענון הקנבס
    }
  };

  return (
    <fieldset className="p-2 pt-1 border border-slate-700 rounded-sm">
      <legend className="px-2 mr-2 text-xs text-slate-400">
        יישור אובייקט
      </legend>
      <div className="size-fit grid grid-cols-3 grid-rows-2 gap-2">
        {icons.map(({ Icon, align, mode }, i) => {
          const onClick =
            mode === "horizon" ? alignToHorizontally : alignToVertically;
          return (
            <EditorButton key={i}>
              <Icon onClick={() => onClick(align)} />
            </EditorButton>
          );
        })}
      </div>
    </fieldset>
  );
};

export default AlignObjects;
