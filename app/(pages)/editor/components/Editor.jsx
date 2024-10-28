"use client";

import React, { useState } from "react";

import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { fabric } from "fabric"; // this also installed on your project
import { cn } from "@/lib/utils";
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
  PaintBucketIcon,
  TextSmallcapsIcon,
} from "@/app/icons/icons";
import ColorPicker from "./ColorPicker";
import TextEditor from "./TextEditor";
import Image from "next/image";
import { indigo, slate } from "tailwindcss/colors";

const ButtonClassName = cn(
  "cursor-pointer h-full w-10 p-1.5",
  "bg-slate-700 text-slate-400",
  "transition-all rounded-sm",
  "hover:bg-slate-600 active:bg-slate-500"
);

const Editor = () => {
  const { editor, onReady, selectedObjects } = useFabricJSEditor();
  const [editedText, setEditedText] = useState("");
  const [showColorPicker, setShowColorPicker] = useState(false);

  const predicate = (event) => {
    console.log("event.key: ", event.key);
    event.key === "Backspace" && editor?.deleteSelected();
  };

  //useKey(predicate);

  console.log("editor: ", editor);

  const addText = () => {
    editor?.addText("טקסט");
  };

  const addRectangle = () => {
    editor?.addRectangle();
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
    <div className="size-full flex-center overflow-hidden">
      <div className="size-full bg-slate-800 overflow-auto p-6 max-w-60 flex-col-center justify-start gap-2">
        <Image
          src="/images/לוגו.png"
          alt="לוגו מזל טוב אישורי הגעה"
          height={100}
          width={100}
          className="mb-5"
        />
        {/* הוספת טקסט */}
        <button
          className={cn(
            ButtonClassName,
            "w-full h-fit p-3 text-indigo-100",
            "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800"
          )}
          onClick={addText}
        >
          הוספת טקסט
        </button>

        {/* שינוי טקסט */}
        <TextEditor editor={editor} />

        {/* יישור */}
        <fieldset className="p-2 pt-1 border border-slate-700 rounded-sm">
          <legend className="px-2 mr-2 text-xs text-slate-400">יישור</legend>
          <div className="size-fit grid grid-cols-3 grid-rows-2 gap-2">
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
        <fieldset className="p-2 pt-1 border border-slate-700 rounded-sm flex-center gap-2">
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
        <fieldset className="p-2 pt-1 border border-slate-700 rounded-sm flex-center gap-2">
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

        {/* צבע טקסט */}
        <fieldset className="p-2 border border-slate-700 rounded-sm flex-center gap-2">
          <legend className="px-2 text-xs text-slate-400">צבע טקסט</legend>
          <div className="relative group">
            {showColorPicker && (
              <div className="absolute inset-0 cursor-pointer" />
            )}
            <PaintBucketIcon
              className={cn(
                ButtonClassName,
                "group-hover:bg-slate-600 group-active:bg-slate-500"
              )}
              onClick={() => {
                setShowColorPicker(!showColorPicker);
              }}
            />
          </div>
          <TextSmallcapsIcon className={ButtonClassName} onClick={() => {}} />
          <TextSmallcapsIcon
            className={ButtonClassName}
            onClick={() => toggleTextStyle("italic")}
          />
        </fieldset>

        {/* color picker */}
        <ColorPicker
          editor={editor}
          showColorPicker={showColorPicker}
          setShowColorPicker={setShowColorPicker}
        />
      </div>
      <FabricJSCanvas className="size-full" onReady={onReady} />
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
