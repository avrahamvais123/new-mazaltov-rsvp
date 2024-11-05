"use client";

import { editor1_Atom, editor2_Atom, editor_Atom } from "@/lib/jotai";
import { useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";
import ColorPicker from "./ColorPicker";
import { usePalette } from "color-thief-react";
import chroma from "chroma-js";

const ColorsOption = () => {
  const editor = useAtomValue(editor_Atom);
  const editor1 = useAtomValue(editor1_Atom);
  const editor2 = useAtomValue(editor2_Atom);
  const [selectedColor, setSelectedColor] = useState("#4f46e5");
  const [myColors, setMyColors] = useState([
    "white",
    "white",
    "white",
    "white",
    "white",
    "white",
  ]);
  const [editingColorIndex, setEditingColorIndex] = useState(null);

  const imageUrl_1 = editor1?.canvas?.backgroundImage?._element?.currentSrc;
  const imageUrl_2 = editor2?.canvas?.backgroundImage?._element?.currentSrc;

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
    if (!editor) return;
    const { canvas } = editor;

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
  }, [editor, selectedColor]);

  const handleColorChange = (color) => {
    if (editingColorIndex !== null) {
      const updatedColors = [...myColors];
      updatedColors[editingColorIndex] = color;
      setMyColors(updatedColors);
      setEditingColorIndex(null); // סוגרים את מצב העריכה לאחר שינוי הצבע
    }
  };

  return (
    <div className="w-full flex-grow flex-col-center justify-start gap-2 overflow-auto">
      <ColorPicker
        selectedColor={selectedColor}
        setSelectedColor={(color) => {
          setSelectedColor(color);
          handleColorChange(color); // מעדכן את הצבע הנבחר לכפתור במצב עריכה
        }}
      />
      <div className="w-full flex-col-center gap-2">
        {/* הצבעים שלי */}
        <fieldset className="size-full p-2 pt-1 border border-slate-700 rounded-sm grid grid-cols-6 auto-rows-auto justify-start self-start gap-1">
          <legend className="px-2 mr-2 text-xs text-slate-400">
            הצבעים שלי
          </legend>
          {myColors?.map((color, i) => (
            <button
              key={`myColor-${i}`}
              className="w-full aspect-square flex-center justify-center items-center bg-gray-300 rounded-sm"
              style={{ backgroundColor: color }}
              onClick={() => setEditingColorIndex(i)} // מאפשר למשתמש לבחור איזה כפתור לערוך
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
