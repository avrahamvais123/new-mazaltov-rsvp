"use client";

import { BowIcon, FoldPageIcon } from "@/app/icons/my-icons";
import { green, lime, purple, red, slate, yellow } from "tailwindcss/colors";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { useClickAway } from "react-use";
import { cn } from "@/lib/utils";
import axios from "axios";

const Preview = ({ files = [], setFiles }) => {
  const [showActions, setShowActions] = useState(null);
  const previewRef = useRef(null);
  useClickAway(previewRef, () => setShowActions(false));

  return (
    <AnimatePresence>
      {files.map((item, idx) => {
        const { id, type, file, FileImage, size, remove, progress, status } =
          item;
        const { color, shadowcolor } = generateBowColor(type);

        const addParamsToFormData = (params) => {
          const formData = new FormData();
          Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              formData.append(key, value);
            }
          });
          return formData;
        };

        const uploadToCloudinary = async () => {
          try {
            // הגדרות env
            const uploadPresets =
              process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
            const api_key = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
            const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

            // פרמטרים לשליחה
            const parametersToSign = {
              folder: "mazaltov-rsvp/invitations",
              public_id: "new-image-2",
              overwrite: true,
              upload_preset: uploadPresets,
            };

            // יצירת מחרוזת כתובת חתומה
            const queryString = new URLSearchParams(
              parametersToSign
            ).toString();

            // קבלת כתובת חתומה מראש
            const { data } = await axios.get(
              `/api/upload-image?${queryString}`
            );

            const formData = addParamsToFormData({
              ...data,
              file,
              api_key,
            });

            console.log("formData: ", formData);

            // מעקב אחרי ההעלאה
            const response = await axios.post(
              `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
              formData,
              {
                onUploadProgress: (progressEvent) => {
                  const progress = Math.round(
                    (progressEvent.loaded / progressEvent.total) * 100
                  );
                  if (progress == 100) {
                    setFiles((prevFiles) =>
                      prevFiles.map((f) =>
                        f.id === id ? { ...f, progress, status: "complete" } : f
                      )
                    );
                  } else {
                    setFiles((prevFiles) =>
                      prevFiles.map((f) =>
                        f.id === id ? { ...f, progress, status: "pending" } : f
                      )
                    );
                  }
                  console.log("Cloudinary Upload Progress: ", progress);
                },
              }
            );
            console.log("Upload success: ", response.data);
            return response.data;
          } catch (error) {
            console.error("Upload error: ", error);
          }
        };

        return (
          /* wrapper */
          <motion.div
            key={id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{ filter: `drop-shadow(0 2px 2px ${slate[200]})` }}
            className="relative bg-transparent overflow-visible size-fit rounded-sm"
          >
            {/* bow */}
            <div className="absolute z-10 top-5 left-[-.9rem] overflow-visible flex-col-center">
              <BowIcon
                color={color}
                shadowcolor={shadowcolor}
                className="size-16 text-slate-200"
              />
              <span className="w-16 h-8 pb-1 absolute top-[0.73rem] left-0 flex-center shadow-lg">
                <p
                  className={cn(
                    "font-medium text-lg text-center",
                    type === "pdf"
                      ? "text-red-600"
                      : type === "svg"
                      ? "text-slate-900"
                      : "text-white"
                  )}
                >
                  {type}
                </p>
              </span>
            </div>

            {/* fold effect */}
            <FoldPageIcon
              color={slate[200]}
              className="z-20 absolute top-0 right-0 size-9"
            />

            {/* item */}
            <motion.div
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onMouseEnter={() => setShowActions(idx)}
              onMouseLeave={() => setShowActions(null)}
              className="z-10 w-44 h-fit overflow-visible bg-white flex-col-center border border-slate-200 rounded-sm"
              style={{
                clipPath: "polygon(0 0, 79% 0, 100% 15%, 100% 100%, 0 100%)",
              }}
            >
              {/* actions modal */}
              <AnimatePresence>
                {showActions === idx && (
                  <div className="z-20 absolute inset-0 p-4 size-full border border-slate-200 rounded-sm">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute inset-0 p-4 size-full backdrop-blur-sm bg-white bg-opacity-60 flex-col-center gap-2 rounded-sm"
                    >
                      <button
                        disabled={status === "complete"}
                        onClick={uploadToCloudinary}
                        className="relative h-10 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white w-full py-2 disabled:cursor-not-allowed"
                      >
                        <p className="z-10 absolute-center w-full">
                          {status === "idle"
                            ? "ממתין"
                            : status === "pending"
                            ? `מעלה קבצים... ${progress}%`
                            : status === "complete"
                            ? `ההעלאה הושלמה`
                            : "העלאה"}
                        </p>
                        <div
                          style={{ width: `${progress}%` }}
                          className={cn(
                            "absolute inset-0 h-full bg-indigo-900 transition-all",
                            status === "complete" && "bg-green-600"
                          )}
                        />
                      </button>
                      <button
                        onClick={remove}
                        className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white w-full py-2"
                      >
                        ביטול
                      </button>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>

              {/* image */}
              <FileImage />

              {/* text */}
              <div className="z-10 w-full py-2 px-4 bg-white flex-col-center -space-x-1 border-t border-slate-200 rounded-b-sm">
                <div className="w-full overflow-x-hidden">
                  <p className="text-sm text-slate-600 truncate">{file.name}</p>
                  <p className="text-xs text-slate-400">{size}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
};

export default Preview;

const generateBowColor = (type) => {
  switch (type) {
    case "pdf":
      return { color: slate[50], shadowcolor: slate[300] };
    case "jpg":
    case "jpeg":
      return { color: lime[600], shadowcolor: lime[800] };
    case "png":
      return { color: purple[600], shadowcolor: purple[800] };
    case "svg":
      return { color: yellow[400], shadowcolor: yellow[600] };
    default:
      return { color: slate[600], shadowcolor: slate[800] };
  }
};
