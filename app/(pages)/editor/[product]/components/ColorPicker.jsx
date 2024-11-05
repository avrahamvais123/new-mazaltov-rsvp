"use client";

import { useEffect } from "react";
import {
  useColor,
  Saturation,
  Hue,
  Alpha,
  ColorPicker as ColorPickerPllete,
} from "react-color-palette";
import Color from "color";
import "react-color-palette/css";
import { cn } from "@/lib/utils";
import { useAtomValue } from "jotai";
import { editor_Atom } from "@/lib/jotai";
import EyeDropper from "./EyeDropper";

const ColorPicker = ({ selectedColor, setSelectedColor }) => {
  const [color, setColor] = useColor("#4f46e5");
  const editor = useAtomValue(editor_Atom);

  const handleColorChange = (newColor) => {
    setSelectedColor(newColor.hex);
    setColor(newColor);

    const activeObject = editor?.canvas?.activeObject;
    if (activeObject) {
      activeObject.set("fill", newColor.hex);
      editor?.canvas?.renderAll();
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

  // בדיקה אם הצבע החדש שנבחר חוקי
  const validateColorInput = (input, currentColor) => {
    // מוודא שהקלט מתחיל בסולמית ואם לא מוסיף אחת
    if (!input.startsWith("#")) {
      input = `#${input}`;
    }

    // מגביל את האורך ל-9 תווים מקסימום (HEX עם אלפא)
    input = input.slice(0, 9);

    // בדיקת תקינות - רק תווים חוקיים ומספיק תווים לפורמט HEX או HEX עם אלפא
    const isValidHex = /^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(input);

    return isValidHex ? input : currentColor; // מחזיר את הצבע הקודם אם הקלט אינו תקין
  };

  useEffect(() => {
    if (selectedColor) {
      const fullColor = hexToFullColorObject(selectedColor);
      setColor(fullColor);
    }
  }, [selectedColor]);

  return (
    <div
      className={cn(
        "overflow-hidden min-h-fit w-full",
        "flex-col-center origin-top",
        "rounded-md"
      )}
    >
      <div className="size-full aspect-square rounded-md">
        <Saturation height={220} color={color} onChange={handleColorChange} />
      </div>

      <div className="w-full mt-4 flex-center gap-2">
        <input
          value={selectedColor}
          onChange={(e) => {
            const validatedColor = validateColorInput(
              e.target.value,
              selectedColor
            );
            setSelectedColor(validatedColor);
          }}
          //style={{ color: selectedColor }}
          className={cn(
            "w-24 bg-transparent text-lg text-center",
            "focus:outline-none outline-none border-none",
            "transition-all rounded-sm text-slate-400"
          )}
        />
        <EyeDropper color={selectedColor} setColor={setSelectedColor} />
      </div>

      <div className="size-full flex-col-center gap-4 p-4 px-4">
        <Hue color={color} onChange={handleColorChange} />
        <Alpha color={color} onChange={handleColorChange} />
      </div>
    </div>
  );
};

export default ColorPicker;

{
  /* <RgbaColorPicker color={color1} onChange={setColor1} /> */
}

{
  /* <ColorPickerPllete
  color={color}
  setColor={handleColorChange}
  hideInput={["hsv", "rgb"]}
/>; */
}
