"use client";

import { CancelCircleIcon } from "@/app/icons/huge-icons";
import { canvas_Atom } from "@/lib/jotai";
import { useAtomValue } from "jotai";
import React, { useRef } from "react";

const ContextMenu = ({ showMenu, setShowMenu, clickEvent }) => {
  const canvas = useAtomValue(canvas_Atom);
  const contextRef = useRef(null);
  /* useClickAway(contextRef, () => {
    setShowMenu(false);
  }); */

  const handleMenuOption = (e, option) => {
    if (option === "duplicate") {
      duplicateObject();
    } else if (option === "delete") {
      removeObject();
    }
    setShowMenu(false);
  };

  const duplicateObject = () => {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      activeObject.clone((cloned) => {
        cloned.set({
          left: activeObject.left + 10,
          top: activeObject.top + 10,
        });
        canvas.add(cloned);
        canvas.setActiveObject(cloned);
        canvas.renderAll();
      });
    }
  };

  const removeObject = () => {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.remove(activeObject);
      canvas.renderAll();
    }
  };

  return (
    <>
      {showMenu && (
        <div
          ref={contextRef}
          onContextMenu={(e) => e.preventDefault()}
          className="z-10 absolute bg-white p-4 rounded-sm shadow-md"
          style={{
            left: clickEvent?.pointer?.x,
            top: clickEvent?.pointer?.y,
          }}
        >
          <button
            onClick={() => setShowMenu(false)}
            className="absolute-center top-0 left-full size-5 flex-center rounded-full bg-red-600"
          >
            <CancelCircleIcon className="text-white" />
          </button>
          <div
            className="z-20"
            onClick={(e) => handleMenuOption(e, "duplicate")}
          >
            שכפל אובייקט
          </div>
          <div className="z-20" onClick={(e) => handleMenuOption(e, "delete")}>
            מחק אובייקט
          </div>
        </div>
      )}
    </>
  );
};

export default ContextMenu;

/* const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (showMenu && clickEvent && contextRef.current) {
      const menuWidth = contextRef.current.offsetWidth;
      const { x, y } = clickEvent.pointer;

      // הגדרת מיקום התפריט כך שימורכז אופקית מעל האובייקט
      setMenuPosition({
        x: x - menuWidth / 2, // ממורכז אופקית
        y: y - 10, // מעל האובייקט, ניתן להתאים אם נדרש יותר או פחות מרחק
      });
    }
  }, [showMenu, clickEvent]); */
