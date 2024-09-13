"use client";

import { useState } from "react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { FileUploadIcon } from "../icons/icons";
import { cn } from "@/lib/utils";
import { getDroppedOrSelectedFiles } from "html5-file-selector";
import {
  CheckmarkCircle01Icon as CheckIcon,
  CancelCircleFillIcon as CancelIcon,
  Delete02Icon,
  ReloadIcon,
} from "@/app/icons/icons";
import localforage from "localforage";
import { useUpdate } from "react-use";
import Link from "next/link";

const greenColor = "#05C851";

export default function MyUploader({ setSteps, carouselApi }) {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const update = useUpdate();

  const getUploadParams = ({ meta }) => {
    console.log("meta from getUploadParams: ", meta);
    return { url: "https://httpbin.org/post" };
  };

  const Preview = (props) => {
    //console.log("props: ", props);

    const { cancel, restart, remove, xhr, file, meta } = props?.fileWithMeta;
    const { name, percent, status, previewUrl } = meta;

    /* text */
    const Text = () => {
      return (
        <div className="flex flex-col gap-0.5 overflow-hidden">
          {/* שם הקובץ */}
          <span className="text-slate-400 text-sm truncate max-w-[90%]">
            {name}
          </span>

          {/* הצגת אחוזים רק בזמן העלאה */}
          {status === "uploading" ? (
            <span className="text-sm">{Math.round(percent)}% עלה</span>
          ) : status === "done" ? (
            <span className="text-lime-600 flex-center justify-start gap-1 rounded-sm text-xs font-bold">
              <CheckIcon className="size-4 text-lime-600" />
              העלאה הושלמה
            </span>
          ) : null}
        </div>
      );
    };

    return (
      <div
        className={cn(
          "w-full md:w-96 p-2 bg-white",
          "border border-slate-100 rounded-sm",
          "flex-center justify-between"
        )}
      >
        {/* image & text */}
        <div className="flex-center gap-2">
          <img
            src={previewUrl}
            alt={name}
            className="size-10 object-cover rounded-sm"
          />
          <Text />
        </div>

        {/* actions */}
        <button className="h-[90%] w-5 ml-1">
          {status !== "done" ? (
            <CancelIcon
              onClick={cancel}
              className="size-full text-slate-300 hover:text-red-600 active:text-red-700"
            />
          ) : (
            <span className="h-full flex-col-center gap-2">
              <ReloadIcon
                onClick={restart}
                className="size-full text-slate-400 hover:text-red-600 active:text-red-700"
              />
              <Delete02Icon
                onClick={remove}
                className="size-full text-slate-400 hover:text-red-600 active:text-red-700"
              />
            </span>
          )}
        </button>
      </div>
    );
  };

  const Input = (props) => {
    //console.log("props from Input: ", props);
    const { accept, onFiles, files, getFilesFromEvent, extra } = props;
    const { active } = extra;

    return (
      <div className="flex flex-col justify-center items-center gap-2">
        <FileUploadIcon
          className={cn(
            "size-14 transition-all",
            active ? "text-indigo-600" : "text-slate-400"
          )}
        />
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

  const Layout = (props) => {
    const {
      input,
      previews,
      submitButton,
      dropzoneProps,
      files,
      extra,
    } = props;
    const { active } = extra;

    return (
      <div className="size-full flex-col-center justify-start md:py-8 gap-4">
        <h1 className="text-xl font-bold text-slate-400">העלאת קבצים</h1>
        <div
          {...dropzoneProps}
          className={cn(
            "aaa w-full h-32 min-h-32",
            "md:h-40 md:min-h-40 md:w-96",
            "rounded-lg p-4 transition-all",
            "border-2 border-dashed border-slate-200",
            active && "border-indigo-500 bg-indigo-50/50",
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
      console.log(`${meta?.name} uploading: ${meta?.percent}%`);
    }

    const statusArray = ["done", "uploading", "headers_received"];

    update();

    /* if (status === "done") {
      setUploadedFiles((prevFiles) => [...prevFiles, file]);
    } else if (status === "removed") {
      setUploadedFiles((prevFiles) => prevFiles.filter((f) => f !== file));
    } */
  };

  const handleSubmit = (files) => {
    console.log("files: ", files);
    const allFiles = files.map((f) => f.meta);

    localforage.setItem("uploadedFiles", allFiles);

    setSteps((prev) =>
      prev.map((step) => (step.id === 2 ? { ...step, status: "done" } : step))
    );
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
          dropzoneActive: "border-indigo-500",
          inputLabel: "text-blue-500 text-lg font-semibold",
          previewImage: "rounded-lg shadow-lg flex-grow",
        }}
      />
    </>
  );
}
