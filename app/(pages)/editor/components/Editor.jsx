"use client";

import React, { useEffect, useState } from "react";

import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { fabric } from "fabric"; // this also installed on your project
import { cn } from "@/lib/utils";
import { useKey } from "react-use";
import {
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  TextIcon,
  AlignRightIcon,
  AlignHorizontalCenterIcon,
  AlignLeftIcon,
  AlignTopIcon,
  AlignVerticalCenterIcon,
  AlignBottomIcon,
} from "@/app/icons/icons";

const ButtonClassName =
  "cursor-pointer bg-slate-100 transition-all p-1.5 h-full w-10 rounded-sm hover:bg-slate-200 active:bg-slate-300";

const Editor = () => {
  const { editor, onReady, selectedObjects } = useFabricJSEditor();
  const [editedText, setEditedText] = useState("");

  console.log("selectedObjects: ", selectedObjects);

  const predicate = (event) => {
    console.log("event.key: ", event.key);
    event.key === "Backspace" && editor?.deleteSelected();
  };

  useKey(predicate);

  console.log("editor: ", editor);
  console.log("editor?.canvas: ", editor?.canvas);

  const addText = () => {
    editor?.addText("טקסט");
  };

  const updateText = () => {
    editor?.updateText(editedText);
  };

  const textAlign = (align) => {
    const activeObject = editor?.canvas?.getActiveObject();
    if (activeObject && activeObject.type === "text") {
      console.log("activeObject: ", activeObject);
      activeObject.set("textAlign", align); // שינוי יישור הטקסט
      editor?.canvas?.renderAll(); // רענון הקנבס לאחר שינוי
    }
  };

  const alignTextBox = (position) => {
    const activeObject = editor?.canvas?.getActiveObject();
    if (activeObject) {
      const canvasWidth = editor.canvas.width;

      switch (position) {
        case "left":
          activeObject.set({
            originX: "left",
            left: 0,
          });
          break;
        case "center":
          activeObject.set({
            originX: "center",
            left: canvasWidth / 2,
          });
          break;
        case "right":
          activeObject.set({
            originX: "right",
            left: canvasWidth,
          });
          break;
        default:
          break;
      }
      editor.canvas.renderAll(); // רענון הקנבס לאחר שינוי
    }
  };

  return (
    <div className="size-full flex-center">
      <div className="size-full p-6 max-w-52 flex-col-center gap-2 ">
        <TextIcon
          className={cn(
            ButtonClassName,
            "w-full aspect-square text-indigo-100",
            "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800"
          )}
          onClick={addText}
        />

        {/* יישור */}
        <fieldset className="border border-slate-200 rounded-sm">
          <legend className="px-2 mr-2 text-sm text-slate-400">יישור</legend>
          <div className="size-fit p-2 grid grid-cols-3 grid-rows-2 gap-2">
            <AlignRightIcon
              className={ButtonClassName}
              onClick={() => alignTextBox("right")}
            />
            <AlignHorizontalCenterIcon
              className={ButtonClassName}
              onClick={() => alignTextBox("center")}
            />
            <AlignLeftIcon
              className={ButtonClassName}
              onClick={() => alignTextBox("left")}
            />
            <AlignTopIcon
              className={ButtonClassName}
              onClick={() => alignTextBox("left")}
            />
            <AlignVerticalCenterIcon
              className={ButtonClassName}
              onClick={() => alignTextBox("left")}
            />
            <AlignBottomIcon
              className={ButtonClassName}
              onClick={() => alignTextBox("left")}
            />
          </div>
        </fieldset>

        {/* יישור טקסט */}
        <fieldset className="p-2 border border-slate-200 rounded-sm flex-center gap-2">
          <legend className="px-2 text-sm text-slate-400">יישור טקסט</legend>
          <TextAlignRightIcon
            className={ButtonClassName}
            onClick={() => textAlign("right")}
          />
          <TextAlignCenterIcon
            className={ButtonClassName}
            onClick={() => textAlign("center")}
          />
          <TextAlignLeftIcon
            className={ButtonClassName}
            onClick={() => textAlign("left")}
          />
        </fieldset>

        <div className="h-full flex-col-center gap-2">
          <textarea
            value={editedText}
            placeholder="הכנס טקסט..."
            className="resize-none w-full px-4 py-2 transition-all rounded-sm border border-slate-200 focus:outline-none focus:border-indigo-600"
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 active:bg-indigo-800"
            onClick={updateText}
          >
            עדכן טקסט
          </button>
        </div>
      </div>
      <FabricJSCanvas className="size-full border" onReady={onReady} />
    </div>
  );
};

export default Editor;

/* useEffect(() => {
    if (!fabric) return;
    console.log('fabric: ', fabric);
    fabric?.Image.fromURL("/images/user-1.png", (oImg) => {
      editor?.canvas.add(oImg);
    });
  }, [fabric, editor]); */
