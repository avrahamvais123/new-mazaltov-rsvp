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
import EditorButton from "./EditorButton";

const icons = [
  {
    Icon: AlignRightIcon,
    align: "right",
  },
  {
    Icon: AlignHorizontalCenterIcon,
    align: "center",
  },
  {
    Icon: AlignLeftIcon,
    align: "left",
  },
  {
    Icon: AlignTopIcon,
    align: "top",
  },
  {
    Icon: AlignVerticalCenterIcon,
    align: "center",
  },
  {
    Icon: AlignBottomIcon,
    align: "bottom",
  },
];

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
      <legend className="px-2 mr-2 text-xs text-slate-400">
        יישור אובייקט
      </legend>
      <div className="size-fit grid grid-cols-3 grid-rows-2 gap-2">
        {icons.map(({ Icon, align }, i) => {
          const onClick = i > 2 ? alignToHorizontally : alignToVertically;
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
