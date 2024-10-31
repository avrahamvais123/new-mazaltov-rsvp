"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useClickAway } from "react-use";
import {
  ColorPicker as ColorPalette,
  useColor,
  Saturation,
  Hue,
  Alpha,
  ColorService,
} from "react-color-palette";
import Color from "color";
import "react-color-palette/css";
import { cn } from "@/lib/utils";

const ColorPicker = ({
  editor,
  showColorPicker,
  setShowColorPicker,
  selectedColor,
  setSelectedColor,
  activeObject,
}) => {
  const ref = useRef();
  const [color, setColor] = useColor("#000000");

  useClickAway(ref, () => {
    setShowColorPicker(false);
  });

  const handleColorChange = (newColor) => {
    setSelectedColor(newColor.hex);
    setColor(newColor);
    if (activeObject) {
      activeObject.set("fill", newColor.hex);
      editor.canvas.renderAll();
    }
  };

  const hexToFullColorObject = (hex) => {
    const color = Color(hex);

    return {
      hex: hex,
      rgb: {
        r: color.red(),
        g: color.green(),
        b: color.blue(),
        a: color.alpha(),
      },
      hsv: {
        h: color.hue(),
        s: color.saturationv(),
        v: color.value(),
        a: color.alpha(),
      },
    };
  };

  useEffect(() => {
    if (selectedColor) {
      const fullColor = hexToFullColorObject(selectedColor);
      setColor(fullColor);
    }
  }, [selectedColor]);

  return (
    <AnimatePresence>
      {showColorPicker && (
        <motion.div
          ref={ref}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          exit={{ scaleY: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "overflow-hidden min-h-fit w-40",
            "flex-col-center origin-top bg-slate-800",
            "border rounded-md border-slate-600"
          )}
        >
          <Saturation height={120} color={color} onChange={handleColorChange} />
          <div className="size-full flex-col-center gap-4 p-4 px-4">
            <Hue color={color} onChange={handleColorChange} />
            <Alpha color={color} onChange={handleColorChange} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ColorPicker;

{
  /* <RgbaColorPicker color={color1} onChange={setColor1} /> */
}
