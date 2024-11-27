"use client";

import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import prettyBytes from "pretty-bytes";
import FileImage from "./FileImage";
import { Upload } from "tus-js-client";

const getType = (fileName) => fileName.substring(fileName.lastIndexOf(".") + 1);

const useOptions = () => {
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
        FileImage: () => <FileImage fileType={fileType} url={reader.result} />,
        progress: 0,
        status: "",
        paused: false,
        size: prettyBytes(file.size),
        remove: () =>
          setFiles((prevFiles) => prevFiles.filter((f) => f.id !== id)),
      };

      const reader = new FileReader();

      /* reader.onprogress = (event) => {
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
      }; */

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

export default useOptions;
