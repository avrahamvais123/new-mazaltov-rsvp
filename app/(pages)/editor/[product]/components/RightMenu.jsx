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
import {
  Add02Icon,
  CancelCircleIcon,
  Layers01Icon,
  PaintBoardIcon,
  StarIcon,
  TextIcon,
} from "@/app/icons/icons";
import ExtendedMenu from "./ExtendedMenu";
import EditorButton from "./EditorButton";
import TextDesignOption from "./TextDesignOption";
import ColorsOption from "./ColorsOption";
import LayersOption from "./LayersOption";

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
  content,
  setContent,
  canvasState,
  setCanvasState,
  state,
}) => [
  // text
  {
    title: (
      <p className="text-xs leading-4 text-slate-500 group-hover:text-indigo-600">
        טקסט
      </p>
    ),
    className: (i) =>
      cn(
        "group hover:text-indigo-600",
        i == 0 ? "brightness-90" : "brightness-100",
        i == 0 && "rounded-bl-md"
      ),
    icon: (
      <TextIcon className="w-full h-1/2 text-slate-500 group-hover:text-indigo-600" />
    ),
    action: (i) => {
      if (!editor) return;
      const { canvas } = editor;
      canvas.renderAll();
      setContent(<TextDesignOption />);
    },
  },
  // colors
  {
    title: (
      <p className="text-xs leading-4 text-slate-500 group-hover:text-indigo-600">
        צבעים
      </p>
    ),
    className: (i) =>
      cn(
        "group hover:text-red-600",
        i == 1 ? "brightness-90" : "brightness-100"
      ),
    icon: <PaintBoardIcon className="w-full h-1/2 text-slate-500" />,
    action: (i) => {
      setContent(<ColorsOption />);
    },
  },
  //layers
  {
    title: (
      <p className="text-xs leading-4 text-slate-500 group-hover:text-indigo-600">
        שכבות
      </p>
    ),
    className: (i) => "group hover:text-green-600",
    icon: <Layers01Icon className="w-full h-1/2 text-slate-500" />,
    action: () => setContent(<LayersOption />),
  },
  // add elements
  {
    title: (
      <p className="text-xs leading-4 text-slate-500 group-hover:text-indigo-600">
        אלמנטים
      </p>
    ),
    className: (i) => "group hover:text-pink-600",
    icon: <StarIcon className="w-full h-1/2 text-slate-500" />,
    action: () => setContent(<div>אלמנטים</div>),
  },
  {
    title: (
      <p className="text-xs leading-4 text-slate-500 group-hover:text-indigo-600">
        טעינת תבנית
      </p>
    ),
    className: (i) => "group hover:text-yellow-600",
    icon: <TextIcon className="w-full h-1/2 text-slate-500" />,
    action: () => loadCanvasState({ editor, state }),
  },
  {
    title: (
      <p className="text-xs leading-4 text-slate-500 group-hover:text-indigo-600">
        תמונת תצוגה
      </p>
    ),
    className: (i) => "group hover:text-cyan-600",
    icon: <TextIcon className="w-full h-1/2 text-slate-500" />,
    action: () => getCanvasThumbnail({ editor }),
  },
];

const RightMenu = ({ editor, activeObject, setShowMenu, setClickEvent }) => {
  const router = useRouter();
  const [state, setState] = useState(null);
  const [canvasState, setCanvasState] = useState(null);
  const [frontThumbnail, setFrontThumbnail] = useState(null);
  const [content, setContent] = useState(null);

  return (
    <div className="z-10 relative overflow-visible bg-slate-800 brightness-90 size-full max-w-20 flex-col-center justify-start">
      <ExtendedMenu content={content} />

      <div className="overflow-auto w-full h-fit grid grid-cols-1 auto-rows-auto">
        {actions({
          editor,
          setClickEvent,
          setShowMenu,
          content,
          setContent,
          canvasState,
          setCanvasState,
          state,
        }).map(({ title, icon, action, className }, i) => {
          return (
            <EditorButton
              key={i}
              className={cn(buttonCn, className(i))}
              onClick={() => action(i)}
            >
              {icon}
              {title}
            </EditorButton>
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
