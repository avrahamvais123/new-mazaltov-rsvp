"use client";

import { useState } from "react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { FileUploadIcon } from "../icons/icons";
import { cn } from "@/lib/utils";
import { getDroppedOrSelectedFiles } from "html5-file-selector";

export default function MyUploader() {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const getUploadParams = ({ meta }) => {
    console.log("meta from getUploadParams: ", meta);
    return { url: "https://httpbin.org/post" };
  };

  const Preview = ({ meta }) => {
    const { name, percent, status, previewUrl } = meta;
    console.log("previewUrl: ", previewUrl);
    console.log("percent: ", percent);

    return (
      <div className="w-full md:w-96 bg-slate-50 p-2 rounded-sm flex-center justify-start gap-4">
        <img src={previewUrl} alt={name} className="size-10 object-cover" />
        <div className="flex flex-col overflow-hidden">
          <span className=" text-slate-600 truncate whitespace-nowrap text-ellipsis">
            {name}
          </span>
          {/* הצגת אחוזים רק בזמן העלאה */}
          {status === "uploading" && <span>{Math.round(percent)}% עלה</span>}
          {status === "done" && (
            <span className="text-lime-600">העלאה הושלמה</span>
          )}
        </div>
      </div>
    );
  };

  const Input = (props) => {
    const { accept, onFiles, files, getFilesFromEvent } = props;
    console.log("props: ", props);

    return (
      <div className="flex flex-col justify-center items-center gap-2">
        <FileUploadIcon className="size-14 text-slate-400" />
        <div className="flex-col-center text-sm text-slate-400">
          <span>גרור לכאן קבצים</span>
          <span>
            או לחץ
            <label
              className={cn(
                "mx-1 text-indigo-600 cursor-pointer",
                "hover:text-indigo-500 active:text-indigo-700"
              )}
            >
              כאן
              <input
                type="file"
                accept={accept}
                multiple
                className="hidden"
                onChange={(e) => {
                  getFilesFromEvent(e).then((chosenFiles) => {
                    onFiles(chosenFiles);
                  });
                }}
              />
            </label>
            כדי לבחור קובץ
          </span>
        </div>
      </div>
    );
  };

  const Layout = ({ input, previews, submitButton, dropzoneProps, files }) => {
    return (
      <div className="size-full flex-col-center justify-start md:py-8 gap-4">
        <h1 className="text-xl font-bold text-slate-400">העלאת קבצים</h1>
        <div
          {...dropzoneProps}
          className={cn(
            "w-full h-32 min-h-32",
            "md:h-40 md:min-h-40 md:w-96",
            "rounded-lg p-4",
            "border-2 border-dashed border-slate-200",
            "flex-col-center gap-4",
            files.length <= 0 && "md:h-60 md:min-h-60"
          )}
        >
          {input}
        </div>
        {files.length > 0 && (
          <>
            <div
              className={cn(
                "w-full flex-grow max-h-[300px]",
                "overflow-auto py-2 gap-2",
                "flex-col-center justify-start"
              )}
            >
              {previews}
            </div>
            {submitButton}
          </>
        )}
      </div>
    );
  };

  const SubmitButton = ({ files, onSubmit }) => {
    return (
      <button
        className={cn(
          "w-full md:w-96",
          "bg-indigo-500 text-white px-4 py-2 rounded-md",
          "hover:bg-indigo-600 active:bg-indigo-700",
          "transition-all duration-200"
        )}
        type="button"
        onClick={() => onSubmit(files)}
      >
        העלה
      </button>
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

  const getFilesFromEvent = (e) => {
    return new Promise((resolve) => {
      getDroppedOrSelectedFiles(e).then((chosenFiles) => {
        resolve(chosenFiles.map((f) => f.fileObject));
      });
    });
  };

  return (
    <>
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        getFilesFromEvent={getFilesFromEvent}
        LayoutComponent={Layout}
        InputComponent={Input}
        PreviewComponent={Preview}
        SubmitButtonComponent={SubmitButton}
        accept="image/*,audio/*,video/*"
        inputContent="העלה קבצים"
        inputLabel="גרור קבצים לכאן או לחץ כדי לבחור"
        submitButtonContent="העלה"
        inputWithFilesContent={(files) => `${files.length} קבצים נבחרו`}
        classNames={{
          dropzoneActive: "bg-red-600",
          inputLabel: "text-blue-500 text-lg font-semibold",
          previewImage: "rounded-lg shadow-lg flex-grow",
        }}
      />
    </>
  );
}
