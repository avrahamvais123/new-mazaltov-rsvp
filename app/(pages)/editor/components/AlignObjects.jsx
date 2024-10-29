"use client";

import {
  AlignBottomIcon,
  AlignHorizontalCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  AlignTopIcon,
  AlignVerticalCenterIcon,
} from "@/app/icons/icons";
import React from "react";

const AlignObjects = ({ editor, buttonClassName }) => {
  const alignToHorizontally = (position) => {
    const activeObject = editor?.canvas?.getActiveObject();
    if (activeObject) {
      const canvasWidth = editor.canvas.width;
      const objectWidth = activeObject.getScaledWidth();

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
      editor.canvas.renderAll(); // רענון הקנבס
    }
  };

  const alignToVertically = (position) => {
    const activeObject = editor?.canvas?.getActiveObject();
    if (activeObject) {
      const canvasHeight = editor.canvas.height;
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
      editor.canvas.renderAll(); // רענון הקנבס
    }
  };

  return (
    <fieldset className="p-2 pt-1 border border-slate-700 rounded-sm">
      <legend className="px-2 mr-2 text-xs text-slate-400">יישור</legend>
      <div className="size-fit grid grid-cols-3 grid-rows-2 gap-2">
        <AlignRightIcon
          className={buttonClassName}
          onClick={() => alignToHorizontally("right")}
        />
        <AlignHorizontalCenterIcon
          className={buttonClassName}
          onClick={() => alignToHorizontally("center")}
        />
        <AlignLeftIcon
          className={buttonClassName}
          onClick={() => alignToHorizontally("left")}
        />
        <AlignTopIcon
          className={buttonClassName}
          onClick={() => alignToVertically("top")}
        />
        <AlignVerticalCenterIcon
          className={buttonClassName}
          onClick={() => alignToVertically("center")}
        />
        <AlignBottomIcon
          className={buttonClassName}
          onClick={() => alignToVertically("bottom")}
        />
      </div>
    </fieldset>
  );
};

export default AlignObjects;
