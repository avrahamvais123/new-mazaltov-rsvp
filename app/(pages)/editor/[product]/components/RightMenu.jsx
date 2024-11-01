"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import TextEditor from "./TextEditor";
import Templates from "./Templates";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  addText,
  duplicateObject,
  getCanvasThumbnail,
  loadCanvasState,
  removeObject,
  saveCanvasState,
} from "./actions";
import { Add02Icon, CancelCircleIcon } from "@/app/icons/icons";

const actions = [
  {
    title: "הוספת טקסט",
    className: cn(
      "w-full h-fit flex-center p-1",
      "text-indigo-100 bg-indigo-600"
    ),
    icon: <CancelCircleIcon />,
    action: ({ editor, setClickEvent, setShowMenu }) =>
      addText({ editor, setClickEvent, setShowMenu }),
  },
  {
    title: "מחיקת טקסט",
    className: cn("w-full h-fit flex-center p-1", "text-red-100 bg-red-600"),
    icon: <CancelCircleIcon />,
    action: ({ editor }) => removeObject({ editor }),
  },
  {
    title: "שכפול",
    className: cn(
      "w-full h-fit flex-center p-1",
      "text-green-100 bg-green-600"
    ),
    icon: <CancelCircleIcon />,
    action: ({ editor, setShowMenu }) =>
      duplicateObject({ editor, setShowMenu }),
  },
  {
    title: "שמירת תבנית",
    className: cn("w-full h-fit flex-center p-1", "text-pink-100 bg-pink-600"),
    icon: <CancelCircleIcon />,
    action: ({ editor, canvasState, setCanvasState }) =>
      saveCanvasState({ editor, canvasState, setCanvasState }),
  },
  {
    title: "טעינת תבנית",
    className: cn(
      "w-full h-fit flex-center p-1",
      "text-yellow-100 bg-yellow-600"
    ),
    icon: <CancelCircleIcon />,
    action: ({ editor, state }) => loadCanvasState({ editor, state }),
  },
  {
    title: "תמונת תצוגה",
    className: cn("w-full h-fit flex-center p-1", "text-cyan-100 bg-cyan-600"),
    icon: <CancelCircleIcon />,
    action: ({ editor }) => getCanvasThumbnail({ editor }),
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

  return (
    <div className="size-full bg-slate-800 overflow-auto p-6 max-w-60 flex-col-center justify-start gap-2">
      <button className="absolute top-4 right-4" onClick={() => router.back()}>
        יציאה
      </button>

      <Image
        src="/images/לוגו.png"
        alt="לוגו מזל טוב אישורי הגעה"
        height={100}
        width={100}
        priority
        className="mb-5"
      />

      <img
        src={frontThumbnail}
        alt="תצוגה מקדימה של הקנבס"
        className="size-40"
      />

      {/* תבניות עיצוב */}
      <Templates />

      <div className="w-full h-fit grid grid-cols-3 grid-rows-2 gap-2">
        {actions.map(({ title, icon, action, className }, i) => {
          return (
            <button
              key={i}
              className={cn(buttonClassName, "flex-col-center", className)}
              onClick={() =>
                action({
                  editor,
                  setShowMenu,
                  canvasState,
                  setCanvasState,
                  state,
                  setClickEvent,
                })
              }
            >
              {icon}
              <p className="text-sm">{title}</p>
            </button>
          );
        })}
      </div>

      {/* עורך טקסט */}
      <TextEditor activeObject={activeObject} editor={editor} />
    </div>
  );
};

export default RightMenu;
