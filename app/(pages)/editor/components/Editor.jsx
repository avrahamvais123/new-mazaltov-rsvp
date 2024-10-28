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
  TextBoldIcon,
  TextUnderlineIcon,
  TextItalicIcon,
} from "@/app/icons/icons";

const ButtonClassName =
  "cursor-pointer bg-slate-100 text-slate-400 transition-all p-1.5 h-full w-10 rounded-sm hover:bg-slate-200 active:bg-slate-300";

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

  const addRectangle = () => {
    editor?.addRectangle();
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

  const toggleTextStyle = (style) => {
    const activeObject = editor?.canvas?.getActiveObject();
    if (activeObject && activeObject.type === "text") {
      switch (style) {
        case "bold":
          activeObject.set(
            "fontWeight",
            activeObject.fontWeight === "bold" ? "normal" : "bold"
          );
          break;
        case "underline":
          activeObject.set("underline", !activeObject.underline);
          break;
        case "italic":
          activeObject.set(
            "fontStyle",
            activeObject.fontStyle === "italic" ? "normal" : "italic"
          );
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
            "w-full h-fit p-3 text-indigo-100",
            "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800"
          )}
          onClick={addText}
        />

        {/* יישור */}
        <fieldset className="border border-slate-200 rounded-sm">
          <legend className="px-2 mr-2 text-xs text-slate-400">יישור</legend>
          <div className="size-fit p-2 grid grid-cols-3 grid-rows-2 gap-2">
            <AlignRightIcon
              className={ButtonClassName}
              onClick={() => alignToHorizontally("right")}
            />
            <AlignHorizontalCenterIcon
              className={ButtonClassName}
              onClick={() => alignToHorizontally("center")}
            />
            <AlignLeftIcon
              className={ButtonClassName}
              onClick={() => alignToHorizontally("left")}
            />
            <AlignTopIcon
              className={ButtonClassName}
              onClick={() => alignToVertically("top")}
            />
            <AlignVerticalCenterIcon
              className={ButtonClassName}
              onClick={() => alignToVertically("center")}
            />
            <AlignBottomIcon
              className={ButtonClassName}
              onClick={() => alignToVertically("bottom")}
            />
          </div>
        </fieldset>

        {/* יישור טקסט */}
        <fieldset className="p-2 border border-slate-200 rounded-sm flex-center gap-2">
          <legend className="px-2 text-xs text-slate-400">יישור טקסט</legend>
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

        {/* עיצוב טקסט */}
        <fieldset className="p-2 border border-slate-200 rounded-sm flex-center gap-2">
          <legend className="px-2 text-xs text-slate-400">עיצוב טקסט</legend>
          <TextBoldIcon
            className={ButtonClassName}
            onClick={() => toggleTextStyle("bold")}
          />
          <TextUnderlineIcon
            className={ButtonClassName}
            onClick={() => toggleTextStyle("underline")}
          />
          <TextItalicIcon
            className={ButtonClassName}
            onClick={() => toggleTextStyle("italic")}
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
      <FabricJSCanvas className="size-full test" onReady={onReady} />
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
