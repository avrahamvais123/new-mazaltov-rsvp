"use client";

import dynamic from "next/dynamic";
import {
  useBatchStartListener,
  useItemProgressListener,
  useAbortItem,
  createUploader,
  useBatchCancelledListener,
  useUploadyContext,
  useBatchAddListener,
  useUploady,
} from "@rpldy/uploady";
import retryEnhancer, { useBatchRetry } from "@rpldy/retry-hooks";
import UploadPreview from "@rpldy/upload-preview";
import UploadButton from "@rpldy/upload-button";
import { cn } from "@/lib/utils";
import {
  CheckmarkCircle01Icon,
  CancelCircleFillIcon,
  Delete02Icon,
  ReloadIcon,
} from "@/app/icons/huge-icons";
import { useCallback, useState } from "react";
import { Progress } from "@/components/ui/progress";

const Uploady = dynamic(() => import("@rpldy/uploady"), { ssr: false });

// קומפוננטה הראשית
const MyUploader = () => {
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState(0);
  console.log("status: ", status);


  return (
    <Uploady
      destination={{ url: "https://httpbin.org/post" }}
      multiple
      accept="image/*,audio/*,video/*"
      enhancer={retryEnhancer}
    >
      <UploadyListeners setStatus={setStatus} setFiles={setFiles} />
      <div
        className={cn(
          "size-full max-w-xl max-h-96 p-4",
          "flex-col-center gap-4",
          "border-2 border-dashed border-slate-200 rounded-md"
        )}
      >
        <UploadButton
          className={cn(
            "bg-indigo-500 text-white px-4 py-2 rounded-md",
            "hover:bg-indigo-600 active:bg-indigo-700",
            "transition-all duration-200"
          )}
        >
          בחר קבצים
        </UploadButton>
        <UploadPreview
          previewComponentProps={{ status }}
          PreviewComponent={Preview}
          className="w-full max-h-[300px] overflow-auto py-2"
        />
      </div>
    </Uploady>
  );
};
export default MyUploader;

// מאזינים
const UploadyListeners = ({ setStatus, setFiles }) => {
  const uploady = useUploady();
  console.log('uploady: ', uploady);

  // מאזין להוספת קבצים
  useBatchAddListener((batch) => {
    console.log("Files added: ", batch.items);
    setFiles((prev) => [...prev, ...batch.items]);
  });

  useBatchStartListener((batch) => {
    console.log("Batch Started: ", batch);
  });

  useItemProgressListener((item) => {
    console.log("item: ", item);
    setStatus(item.completed);
    console.log(`Uploading ${item.file.name}: ${item.completed}%`);
  });

  return null;
};

// קומפוננטת Preview מותאמת אישית
const Preview = ({ id, url, name, type, status, removePreview }) => {
  const uploader = createUploader();
  console.log("uploader: ", uploader);

  const uploadyContext = useUploadyContext();
  console.log("uploadyContext: ", uploadyContext);

  const retry = useBatchRetry();

  return (
    <div
      className={cn(
        "w-full md:w-96 p-2 bg-white",
        "border border-slate-100 rounded-sm",
        "flex-center justify-between"
      )}
    >
      <div className="w-full flex items-center gap-2">
        {url && (
          <img
            src={url}
            alt={name}
            className="size-10 object-cover rounded-sm"
          />
        )}

        <div className="w-full flex-col-center">
          {/* name */}
          <div className="w-full gap-0.5 overflow-hidden">
            <span className="text-slate-400 text-sm truncate max-w-[90%]">
              {name}
            </span>
          </div>

          {/* status */}
          <div className="w-full flex-center gap-2">
            {`${Math.round(status)}%`}

            <Progress
              dir="rtl"
              classNames={{ root: "bg-indigo-100", indicator: "bg-indigo-600" }}
              value={status}
            />

            {/* actions */}
            <Delete02Icon
              onClick={() => removePreview(id)}
              className="size-6 cursor-pointer text-slate-400 hover:text-red-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
