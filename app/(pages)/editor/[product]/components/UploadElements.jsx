"use client";

import React from "react";
import fabricModule from "fabric";
import { useAtomValue } from "jotai";
import { canvas_Atom } from "@/lib/jotai";
import { FileUploadIcon } from "@/app/icons/icons";
const { fabric } = fabricModule;

const UploadElements = () => {
  const canvas = useAtomValue(canvas_Atom);
  const fileInputRef = React.useRef(null);

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
        className="w-full flex-center p-4 *:text-indigo-50 bg-indigo-500 rounded-md hover:bg-indigo-600 transition duration-200"
      >
        <FileUploadIcon />
      </button>
    </div>
  );
};

export default UploadElements;
