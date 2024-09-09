"use client";

import { useState } from "react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { FileUploadIcon } from "../icons/icons";

export default function MyUploader() {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const getUploadParams = ({ meta }) => {
    console.log("meta from getUploadParams: ", meta);
    return { url: "https://httpbin.org/post" };
  };

  const a = "";
  
  const Preview = ({ meta }) => {
    const { name, percent, status, previewUrl } = meta;
    console.log("percent: ", percent);

    return (
      <div className="w-full bg-slate-100 p-2 rounded-sm flex-center justify-start gap-4">
        <img src={previewUrl} alt={name} className="size-10 object-cover" />
        <div className="flex flex-col">
          <span>{name}</span>
          {/* הצגת אחוזים רק בזמן העלאה */}
          {status === "uploading" && <span>{Math.round(percent)}% עלה</span>}
          {status === "done" && <span>העלאה הושלמה</span>}
        </div>
      </div>
    );
  };

  const InputComponent = () => {
    return (
      <div className="flex flex-col justify-center items-center gap-4">
        <FileUploadIcon className="size-10" />
        <span className="leading-4">{`גרור קבצים לכאן 
         או לחץ כדי לבחור`}</span>
      </div>
    );
  };

  const LayoutComponent = ({
    input,
    previews,
    submitButton,
    dropzoneProps,
    files,
  }) => {
    return (
      <div>
        <div {...dropzoneProps}>{input}</div>
        <div className="flex-grow max-h-[300px] overflow-auto py-2 flex-col-center gap-2">
          {previews}
        </div>
        {files.length > 0 && submitButton}
      </div>
    );
  };

  const handleChangeStatus = ({ meta, file }, status) => {
    console.log("status: ", status);
    console.log("meta from handleChangeStatus: ", meta);

    if (status === "uploading") {
      console.log(`${meta.name} uploading: ${meta.percent}%`);
    }

    const statusArray = ["done", "uploading", "headers_received"];

    if (status !== "removed") {
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
      PreviewComponent={Preview}
      InputComponent={InputComponent}
      LayoutComponent={LayoutComponent}
      accept="image/*,audio/*,video/*"
      submitButtonContent="העלה"
      inputContent="העלה קבצים"
      inputLabel="גרור קבצים לכאן או לחץ כדי לבחור"
      inputWithFilesContent={(files) => `${files.length} קבצים נבחרו`}
      classNames={{
        dropzone:
          "w-96 h-32 border-2 border-dashed border-slate-200 rounded-lg p-4 flex-col-center gap-4",
        inputLabel: "text-blue-500 text-lg font-semibold",
        previewImage: "rounded-lg shadow-lg flex-grow",
      }}
    />
  );
}
