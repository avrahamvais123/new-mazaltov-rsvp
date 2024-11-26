"use client";

import { Cancel02Icon } from "@/app/icons/icons";
import { cn } from "@/lib/utils";

const Preview = ({ files = [] }) => {
  return (
    <div
      className={cn(
        "relative size-full max-h-fit p-4 overflow-auto",
        "grid grid-cols-3 auto-rows-auto gap-2",
        "max-md:grid-cols-2 max-sm:grid-cols-1",
        "place-items-center md:place-items-start"
      )}
    >
      {files.map((item, idx) => {
        const {
          id,
          type,
          file,
          PreviewImage,
          size,
          remove,
          progress,
          status,
          paused,
        } = item;
        console.log("type: ", type);

        const generateTypeImage = () => {
          switch (type) {
            case "pdf":
              return "/images/pdf.png";
            case "jpg":
            case "jpeg":
              return "/images/jpg.png";
            case "png":
              return "/images/png.png";
            default:
              return "";
          }
        };

        return (
          <div
            key={idx}
            className="relative w-52 h-fit shadow-md shadow-slate-200 bg-white flex-col-center border border-slate-200 rounded-sm"
          >
            <PreviewImage />

            {/* text */}
            <div className="w-full py-2 px-4 flex-center -space-x-1 border-t border-slate-200">
              <div className="w-full overflow-x-hidden">
                <p className="text-sm text-slate-600 truncate">{file.name}</p>
                <p className="text-xs text-slate-400">{`${size} MB`}</p>
              </div>

              <div className="h-full w-2 mx-2 bg-slate-400" />

              <img src={generateTypeImage()} className="w-6 h-7 object-cover" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Preview;
