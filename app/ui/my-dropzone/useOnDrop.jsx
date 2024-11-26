"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import prettyBytes from 'pretty-bytes';

const getType = (fileName) => fileName.substring(fileName.lastIndexOf(".") + 1);

const useOnDrop = () => {
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [showDropzone, setShowDropzone] = useState(false);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const newFiles = acceptedFiles.map((file) => {
      const id = uuid();
      const fileType = getType(file.name);

      const fileData = {
        id,
        file,
        type: fileType,
        name: file.name,
        PreviewImage: () => (
          <PreviewImage fileType={fileType} url={reader.result} />
        ),
        progress: 0,
        status: "pending",
        paused: false,
        size: prettyBytes(file.size),
        //size: (file.size / (1024 * 1024)).toFixed(2),
        remove: () =>
          setFiles((prevFiles) => prevFiles.filter((f) => f.id !== id)),
      };

      const reader = new FileReader();

      reader.onprogress = (event) => {
        if (event.loaded && event.total) {
          const progress = Math.round((event.loaded / event.total) * 100);
          setFiles((prevFiles) =>
            prevFiles.map((f) => (f.file === file ? { ...f, progress } : f))
          );
        }
      };

      reader.onload = () => {
        setFiles((prevFiles) =>
          prevFiles.map((f) =>
            f.file === file ? { ...f, status: "ready" } : f
          )
        );
      };

      reader.readAsDataURL(file);

      return fileData;
    });

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    setShowDropzone(false);
  }, [acceptedFiles]);

  return {
    files,
    setFiles,
    showDropzone,
    setShowDropzone,
    acceptedFiles,
    setAcceptedFiles,
  };
};

export default useOnDrop;

const PreviewImage = ({ fileType, url }) => {
  const allowedExtensions = ["jpg", "jpeg", "png", "gif", "svg"]; // הוספת svg
  const specialExtensions = ["pdf", "doc", "docx", "xls", "xlsx"];
  const isImage = allowedExtensions.includes(fileType);
  const isSpecial = specialExtensions.includes(fileType);
  const isPDF = fileType === "pdf";

  const preview = isImage
    ? url // תומך גם ב-SVG דרך ה-URL
    : isPDF
    ? "/images/pdf.png"
    : "";

  return (
    <div className="size-full aspect-square flex-center">
      {isImage ? (
        <img
          src={preview}
          alt={fileType}
          className={cn(
            "aspect-square rounded-t-sm",
            fileType === "svg"
              ? "size-auto object-contain"
              : "size-auto object-cover" // התנהגות שונה ל-SVG
          )}
        />
      ) : (
        <div className="text-center">Unsupported file type</div>
      )}
    </div>
  );
};
