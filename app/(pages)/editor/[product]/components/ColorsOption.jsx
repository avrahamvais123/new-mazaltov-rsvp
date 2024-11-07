"use client";

import { canvas1_Atom, canvas2_Atom, canvas_Atom } from "@/lib/jotai";
import { useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";
import ColorPicker from "./ColorPicker";
import { usePalette } from "color-thief-react";
import chroma from "chroma-js";

const ColorsOption = () => {
  const canvas = useAtomValue(canvas_Atom);
  const canvas1 = useAtomValue(canvas1_Atom);
  const canvas2 = useAtomValue(canvas2_Atom);
  const [selectedColor, setSelectedColor] = useState(
    canvas?.getActiveObject()?.fill || "#4f46e5"
  );
  const [myColors, setMyColors] = useState([]);

  const imageUrl_1 = canvas1?.backgroundImage?._element?.currentSrc;
  const imageUrl_2 = canvas2?.backgroundImage?._element?.currentSrc;

  const { data: colors_1, loading_1, error_1 } = usePalette(
    imageUrl_1,
    6,
    "hex",
    {
      crossOrigin: "anonymous",
      quality: 1000,
    }
  );

  const { data: colors_2, loading_2, error_2 } = usePalette(
    imageUrl_2,
    6,
    "hex",
    {
      crossOrigin: "anonymous",
      quality: 1000,
    }
  );

  const getComplementaryColors = (colors) => {
    return colors?.map((color) => {
      const complementaryColor = chroma(color).set("hsl.h", "+180").hex();
      return complementaryColor;
    });
  };

  const complementaryColors_1 = getComplementaryColors(colors_1);
  const complementaryColors_2 = getComplementaryColors(colors_2);

  useEffect(() => {
    if (!canvas) return;

    const activeObject = canvas?.getActiveObject();

    if (activeObject) {
      activeObject.set("fill", selectedColor);
      canvas.renderAll();
    }

    const getObjectColor = () => {
      const activeObject = canvas?.getActiveObject();
      if (activeObject) {
        setSelectedColor(activeObject.fill);
      }
    };
    canvas.on("selection:created", getObjectColor);

    return () => {
      canvas.off("selection:created", getObjectColor);
    };
  }, [canvas, selectedColor]);

  const handleSaveColor = () => {
    setMyColors(() => [...myColors, selectedColor]);
  };

  return (
    <div className="w-full flex-grow flex-col-center justify-start gap-2 overflow-auto">
      <ColorPicker
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        //setSelectedColor={(color) => setSelectedColor(color)}
      />
      <button
        onClick={handleSaveColor}
        className="w-fit px-4 py-1 rounded-sm bg-indigo-600 text-indigo-50 hover:brightness-90 active:brightness-75 transition-all"
      >
        שמירת צבע
      </button>

      <div className="w-full flex-col-center gap-2">
        {/* הצבעים שלי */}
        <fieldset className="size-full min-h-14 p-2 pt-1 border border-slate-700 rounded-sm grid grid-cols-6 auto-rows-auto justify-start self-start gap-1">
          <legend className="px-2 mr-2 text-xs text-slate-400">
            הצבעים שלי
          </legend>
          {myColors?.map((color, i) => (
            <button
              key={`myColor-${i}`}
              className="w-full aspect-square flex-center justify-center items-center bg-gray-300 rounded-sm"
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </fieldset>

        {/* צבעים דומיננטיים מהתמונה */}
        <fieldset className="size-full p-2 pt-1 border border-slate-700 rounded-sm grid grid-cols-6 auto-rows-auto justify-start self-start gap-1">
          <legend className="px-2 mr-2 text-xs text-slate-400">
            צבעים מהתמונה
          </legend>
          {colors_1?.map((color, i) => (
            <button
              key={`color1-${i}`}
              className="w-full aspect-square flex-center justify-center items-center bg-gray-300 rounded-sm"
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            />
          ))}
          {colors_2?.map((color, i) => (
            <button
              key={`color2-${i}`}
              className="w-full aspect-square flex-center justify-center items-center bg-gray-300 rounded-sm"
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </fieldset>

        {/* צבעים משלימים */}
        <fieldset className="size-full p-2 pt-1 border border-slate-700 rounded-sm grid grid-cols-6 auto-rows-auto justify-start self-start gap-1">
          <legend className="px-2 mr-2 text-xs text-slate-400">
            צבעים משלימים
          </legend>
          {complementaryColors_1?.map((color, i) => (
            <button
              key={`complementary1-${i}`}
              className="w-full aspect-square flex-center justify-center items-center bg-gray-300 rounded-sm"
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            />
          ))}
          {complementaryColors_2?.map((color, i) => (
            <button
              key={`complementary2-${i}`}
              className="w-full aspect-square flex-center justify-center items-center bg-gray-300 rounded-sm"
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </fieldset>
      </div>
    </div>
  );
};

export default ColorsOption;
