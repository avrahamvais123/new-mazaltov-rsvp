"use client";

import React, { useRef } from "react";
import fabricModule from "fabric";
import { useAtomValue } from "jotai";
import { canvas_Atom } from "@/lib/jotai";
import { FileUploadIcon } from "@/app/icons/icons";
import { cn } from "@/lib/utils";
const { fabric } = fabricModule;

const UploadElements = () => {
  const canvas = useAtomValue(canvas_Atom);
  const fileInputRef = useRef(null);

  function handleFileUpload(event) {
    if (!canvas) return;

    const file = event.target.files[0];
    if (!file) return;

    const fileType = file.type;

    // ניהול קובץ SVG
    if (fileType === "image/svg+xml") {
      const reader = new FileReader();
      reader.onload = function (e) {
        const svgData = e.target.result;

        fabric.loadSVGFromString(svgData, (objects, options) => {
          const svgGroup = fabric.util.groupSVGElements(objects, options);
          svgGroup.scaleToWidth(canvas.width / 2); // שנה לפי גודל הקנבס
          svgGroup.scaleToHeight(canvas.height / 2); // שנה לפי גודל הקנבס
          canvas.add(svgGroup);
          canvas.centerObject(svgGroup); // מיקום במרכז הקנבס
          canvas.renderAll();
        });
      };
      reader.readAsText(file);
    }
    // ניהול קובץ PNG
    else if (fileType === "image/png") {
      const reader = new FileReader();
      reader.onload = function (e) {
        const dataURL = e.target.result;

        fabric.Image.fromURL(dataURL, (img) => {
          img.scaleToWidth(canvas.width / 2); // שינוי הגודל בהתאם לצורך
          img.scaleToHeight(canvas.height / 2); // שינוי הגודל בהתאם לצורך
          canvas.add(img);
          canvas.centerObject(img); // מיקום במרכז הקנבס
          canvas.renderAll();
        });
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid SVG or PNG file.");
    }
  }

  function triggerFileInput() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  return (
    <div className="w-full flex-center">
      {/* אינפוט קובץ מוסתר */}
      <input
        type="file"
        accept=".svg, .png"
        onChange={handleFileUpload}
        ref={fileInputRef}
        className="hidden"
      />

      {/* כפתור מותאם לפתיחת חלון העלאה */}
      <button
        onClick={triggerFileInput}
        className={cn(
          "w-full p-4 flex-col-center gap-2 rounded-md", 
          "border-2 border-dashed border-indigo-600", 
          "hover:border-solid hover:bg-indigo-600", 
          "transition duration-200"
        )}
      >
        <FileUploadIcon className="text-indigo-100" />
        <p className="text-sm text-indigo-100">העלאת אלמנט</p>
      </button>
    </div>
  );
};

export default UploadElements;
