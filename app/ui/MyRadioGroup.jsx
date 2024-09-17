"use client";

import { cn } from "@/lib/utils";

export default function MyRadioGroup({
  options = [],
  register = () => {},
  watch = () => {},
  name,
  title,
  classNames = {},
}) {
  //console.log("watch: ", watch);
  return (
    <fieldset className={cn("flex-col-center gap-2", classNames?.wrapper)}>
      {title && <legend className="text-lg font-medium">{title}</legend>}

      {options.map((option, index) => {
        const isActive = watch(option?.value)[name] == option?.value;

        return (
          <label
            key={index}
            htmlFor={option?.htmlFor}
            className={cn(
              "w-full cursor-pointer p-4",
              "flex-center justify-between gap-2",
              "rounded-sm border text-sm",
              "transition-colors duration-200 ease-in-out",
              isActive
                ? "bg-indigo-50 border-indigo-200"
                : "border-slate-200 hover:bg-slate-50",
              classNames?.label
            )}
          >
            {/* name & circle */}
            <div className="flex-center gap-2">
              {/* circle */}
              <span
                className={cn(
                  "relative size-5",
                  "border rounded-full box-border",
                  "transition-all duration-500 ease-in-out",
                  isActive
                    ? "border-indigo-600 border-[6px]"
                    : "border-slate-200",
                  classNames?.circle
                )}
              >
                <input
                  {...register(name)}
                  type="radio"
                  value={option?.value}
                  className="appearance-none"
                />
              </span>

              {/* text */}
              <span
                className={cn(
                  "font-medium",
                  isActive && "text-indigo-600",
                  classNames?.text
                )}
              >
                {option?.text}
              </span>
            </div>

            {/* description */}
            <span className={cn(classNames?.description)}>
              {option?.description}
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}
