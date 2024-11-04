"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  addText,
  duplicateObject,
  getCanvasThumbnail,
  loadCanvasState,
  removeObject,
  saveCanvasState,
} from "./actions";
import { Add02Icon, CancelCircleIcon, TextIcon } from "@/app/icons/icons";
import ExtendedMenu from "./ExtendedMenu";

const buttonCn = cn(
  "z-10 w-full h-fit flex-center px-4 py-2",
  "flex-col-center gap-1",
  "aspect-square rounded-none",
  "text-indigo-100 transition-all",
  "bg-slate-800 hover:brightness-90"
);

const content = {
  "": null,
  text: <div className="size-full p-2 flex-col-center">text</div>,
};

const actions = ({
  editor,
  setClickEvent,
  setShowMenu,
  showExtendedMenu,
  setShowExtendedMenu,
  canvasState,
  setCanvasState,
  state,
}) => [
  // text
  {
    title: (
      <p className="text-xs leading-4 text-slate-500 group-hover:text-indigo-600">
        הוספת טקסט
      </p>
    ),
    className: cn(
      "group hover:text-indigo-600",
      showExtendedMenu === "text" ? "brightness-90" : "brightness-100",
      showExtendedMenu === "remove" && "rounded-bl-md"
    ),
    icon: (
      <TextIcon className="w-full h-1/2 text-slate-500 group-hover:text-indigo-600" />
    ),
    action: () => {
      if (!editor) return;
      const { canvas } = editor;
      //addText({ editor, setClickEvent, setShowMenu }),
      setShowExtendedMenu((prev) => (prev !== "text" ? "text" : ""));
      canvas.renderAll();
    },
  },
  {
    title: (
      <p className="text-xs leading-4 text-slate-500 group-hover:text-indigo-600">
        מחיקת טקסט
      </p>
    ),
    className: cn(
      "group hover:text-red-600",
      showExtendedMenu === "remove" ? "brightness-90" : "brightness-100"
    ),
    icon: <TextIcon className="w-full h-1/2 text-slate-500" />,
    action: () => {
      removeObject({ editor });
      setShowExtendedMenu((prev) => (prev !== "remove" ? "remove" : ""));
    },
  },
  {
    title: (
      <p className="text-xs leading-4 text-slate-500 group-hover:text-indigo-600">
        שכפול
      </p>
    ),
    className: "group hover:text-green-600",
    icon: <TextIcon className="w-full h-1/2 text-slate-500" />,
    action: () => duplicateObject({ editor, setShowMenu }),
  },
  {
    title: (
      <p className="text-xs leading-4 text-slate-500 group-hover:text-indigo-600">
        שמירת תבנית
      </p>
    ),
    className: "group hover:text-pink-600",
    icon: <TextIcon className="w-full h-1/2 text-slate-500" />,
    action: () => saveCanvasState({ editor, canvasState, setCanvasState }),
  },
  {
    title: (
      <p className="text-xs leading-4 text-slate-500 group-hover:text-indigo-600">
        טעינת תבנית
      </p>
    ),
    className: "group hover:text-yellow-600",
    icon: <TextIcon className="w-full h-1/2 text-slate-500" />,
    action: () => loadCanvasState({ editor, state }),
  },
  {
    title: (
      <p className="text-xs leading-4 text-slate-500 group-hover:text-indigo-600">
        תמונת תצוגה
      </p>
    ),
    className: "group hover:text-cyan-600",
    icon: <TextIcon className="w-full h-1/2 text-slate-500" />,
    action: () => getCanvasThumbnail({ editor }),
  },
];

const RightMenu = ({
  editor,
  activeObject,
  buttonClassName,
  setShowMenu,
  setClickEvent,
}) => {
  const router = useRouter();
  const [state, setState] = useState(null);
  const [canvasState, setCanvasState] = useState(null);
  const [frontThumbnail, setFrontThumbnail] = useState(null);
  const [showExtendedMenu, setShowExtendedMenu] = useState("");
  console.log("showExtendedMenu: ", showExtendedMenu);

  return (
    <div className="z-10 relative overflow-visible bg-slate-800 brightness-90 size-full max-w-20 flex-col-center justify-start">
      <ExtendedMenu
        editor={editor}
        showExtendedMenu={showExtendedMenu}
        content={content[showExtendedMenu]}
      />

      <div className="overflow-auto w-full h-fit grid grid-cols-1 auto-rows-auto">
        {actions({
          editor,
          setClickEvent,
          setShowMenu,
          showExtendedMenu,
          setShowExtendedMenu,
          canvasState,
          setCanvasState,
          state,
        }).map(({ title, icon, action, className }, i) => {
          return (
            <button
              key={i}
              className={cn(buttonClassName, buttonCn, className)}
              onClick={action}
            >
              {icon}
              {title}
            </button>
          );
        })}
      </div>

      {/* עורך טקסט */}
      {/* <TextEditor activeObject={activeObject} editor={editor} /> */}
    </div>
  );
};

export default RightMenu;

{
  /* <img
        src={frontThumbnail}
        alt="תצוגה מקדימה של הקנבס"
        className="size-40"
      /> */
}
