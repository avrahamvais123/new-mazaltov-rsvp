"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { ChromePicker } from "react-color";
import { useClickAway } from "react-use";

const ColorPicker = ({
  editor,
  showColorPicker,
  setShowColorPicker,
  selectedColor,
  setSelectedColor,
}) => {
  const ref = useRef();

  // Close ColorPicker when clicking outside of it
  useClickAway(ref, () => {
    setShowColorPicker(false);
  });

  const handleColorChange = (color) => {
    setSelectedColor({
      h: color.hsl.h,
      s: color.hsl.s,
      l: color.hsl.l,
      a: color.hsl.a,
    });

    const activeObject = editor?.canvas?.getActiveObject();
    if (activeObject && activeObject.type === "text") {
      activeObject.set(
        "fill",
        `hsla(${color.hsl.h}, ${color.hsl.s * 100}%, ${color.hsl.l * 100}%, ${
          color.hsl.a
        })`
      );
      editor.canvas.renderAll();
    }
  };

  const handleSaturationChange = (e) => {
    const newSaturation = parseFloat(e.target.value);
    setSelectedColor((prevColor) => ({ ...prevColor, s: newSaturation }));

    const activeObject = editor?.canvas?.getActiveObject();
    if (activeObject && activeObject.type === "text") {
      activeObject.set(
        "fill",
        `hsla(${selectedColor.h}, ${newSaturation * 100}%, ${
          selectedColor.l * 100
        }%, ${selectedColor.a})`
      );
      editor.canvas.renderAll();
    }
  };

  return (
    <AnimatePresence>
      {showColorPicker && (
        <motion.div
          ref={ref}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          exit={{ scaleY: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden min-h-fit origin-top max-w-52 border-2 rounded-sm border-slate-600 flex-center bg-white"
        >
          <ChromePicker
            color={selectedColor}
            onChange={handleColorChange}
            className="w-full"
          />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={selectedColor.s}
            onChange={handleSaturationChange}
            className="hidden"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default ColorPicker;
