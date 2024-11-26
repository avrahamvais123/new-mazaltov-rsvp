"use client";

import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import prettyBytes from "pretty-bytes";
import FileImage from "./FileImage";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const getType = (fileName) => fileName.substring(fileName.lastIndexOf(".") + 1);

const useOptions = () => {
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [showDropzone, setShowDropzone] = useState(false);
  const [files, setFiles] = useState([]);

  const uploadMutation = useMutation({
    mutationFn: async (file) => {
      console.log("file from mutation: ", file);
      const formData = new FormData();
      formData.append("file", file);
      //formData.append("public_id", uuid());
      //formData.append("folder", "my-folder");

      const res = await axios.post("/api/upload-image", formData, {});

      return res?.data;
    },
  });

  useEffect(() => {
    const newFiles = acceptedFiles.map((file) => {
      const id = uuid();
      const fileType = getType(file.name);
      const bytes = prettyBytes(file.size);

      const fileData = {
        id,
        file,
        type: fileType,
        name: file.name,
        PreviewImage: () => (
          <FileImage fileType={fileType} url={reader.result} />
        ),
        progress: 0,
        status: "pending",
        paused: false,
        size: bytes,
        remove: () =>
          setFiles((prevFiles) => prevFiles.filter((f) => f.id !== id)),
        upload: async (file) => {
          const data = await uploadMutation.mutateAsync(file);
          console.log("data: ", data);
          //return uploadMutation;
        },
        uploadAll: () => {
          uploadMutation.mutate({ file });
        },
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

export default useOptions;
