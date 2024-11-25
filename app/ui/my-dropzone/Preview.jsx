"use client"

import { Cancel02Icon } from "@/app/icons/icons";

const Preview = ({ files = [] }) => {
    return (
      <>
        {files.map((item, idx) => {
          const {
            id,
            file,
            PreviewImage,
            size,
            remove,
            progress,
            status,
            paused,
          } = item;
  
          return (
            <div
              key={idx}
              className="relative w-52 h-fit shadow-md shadow-slate-200 bg-white flex-col-center border border-slate-200 rounded-sm"
            >
              <Cancel02Icon
                onClick={remove}
                className="cursor-pointer text-red-600 size-6 absolute -top-2 -right-2"
              />
              <PreviewImage />
              <div className="w-full border-t border-slate-200 p-2">
                <p className="text-sm text-slate-600 truncate w-full overflow-x-hidden">
                  {file.name}
                </p>
                <p className="text-xs text-slate-400">{`${size} MB`}</p>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  export default Preview;