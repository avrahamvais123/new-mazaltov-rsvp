"use client";

import { useState } from "react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { FileUploadIcon } from "../icons/icons";

export default function MyUploader() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  console.log("uploadedFiles: ", uploadedFiles);

  const getUploadParams = ({ meta }) => {
    return { url: "https://httpbin.org/post" };
  };

  const Preview = ({ meta }) => {
    const { name, percent, status } = meta;
    return (
      <span className="w-full bg-slate-100 p-2 rounded-sm flex flex-col justify-center items-center gap-4">
        <img
          src={meta?.previewUrl}
          alt={meta?.name}
          className="size-10 object-cover"
        />
        {name}, {Math.round(percent)}%, {status}
      </span>
    );
  };

  const InputComponent = () => {
    return (
      <div className="flex flex-col justify-center items-center gap-4">
        <FileUploadIcon className="size-6" />
        <span className="leading-4">{`גרור קבצים לכאן 
         או לחץ כדי לבחור`}</span>
      </div>
    );
  };

  const handleChangeStatus = ({ meta, file }, status) => {
    console.log("status: ", status);
    console.log("file: ", file);
    console.log("meta: ", meta);

    if (status === "done") {
      setUploadedFiles((prevFiles) => [...prevFiles, file]);
    } else if (status === "removed") {
      setUploadedFiles((prevFiles) => prevFiles.filter((f) => f !== file));
    }
  };

  const handleSubmit = (files) => {
    console.log(files.map((f) => f.meta));
  };

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      accept="image/*,audio/*,video/*"
      PreviewComponent={Preview}
      InputComponent={InputComponent}
      submitButtonContent="העלה"
      inputWithFilesContent={(files) => `${files.length} קבצים נבחרו`}
      /* classNames={{
        dropzone:
          "w-96 h-auto border-2 border-dashed border-slate-200 rounded-lg p-4 flex items-center justify-center gap-4",
        inputLabel: "text-blue-500 text-lg font-semibold",
        previewImage: "rounded-lg shadow-lg flex-grow",
      }} */
      disabled={(files) =>
        files.some((f) =>
          ["preparing", "getting_upload_params", "uploading"].includes(
            f.meta.status
          )
        )
      }
    />
  );
}
