"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

const getFileExtension = (fileName) =>
  fileName.substring(fileName.lastIndexOf(".") + 1);

const useOnDrop = () => {
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [showDropzone, setShowDropzone] = useState(false);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const newFiles = acceptedFiles.map((file) => {
      const id = uuid();
      const fileExtension = getFileExtension(file.name);

      const fileData = {
        id,
        file,
        name: file.name,
        PreviewImage: () => (
          <PreviewImage fileExtension={fileExtension} url={reader.result} />
        ),
        progress: 0,
        status: "pending",
        paused: false,
        size: (file.size / (1024 * 1024)).toFixed(2),
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

const PreviewImage = ({ fileExtension, url }) => {
  const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
  const specialExtensions = ["pdf", "doc", "docx", "xls", "xlsx"];
  const isImage = allowedExtensions.includes(fileExtension);
  const isSpecial = specialExtensions.includes(fileExtension);
  const isPDF = fileExtension === "pdf";

  const preview = isImage
    ? url // כאן תוכל להכניס את התמונה אם היא תמונה תקינה
    : isPDF
    ? "/images/pdf.png"
    : "";

  return (
    <div className="size-full aspect-square flex-center">
      <img
        src={preview}
        alt={fileExtension}
        className={cn(
          "aspect-square",
          isSpecial ? "size-20 object-contain" : "size-auto object-cover"
        )}
      />
    </div>
  );
};
