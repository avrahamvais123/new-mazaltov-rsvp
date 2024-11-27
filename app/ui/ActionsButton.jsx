"use client";

import React, { useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowDown01Icon } from "../icons/huge-icons";
import { cn } from "@/lib/utils";
import { ClickAwayListener } from "@mui/material";

const ActionsButton = ({ triger, content }) => {
  const [open, setOpen] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div className="relative w-fit rounded-sm flex bg-indigo-600 text-white">
        <div className="border-l border-slate-100 px-2 py-1">פעולות</div>

        <Popover open={open}>
          <PopoverTrigger asChild>
            {triger ? (
              triger
            ) : (
              <button
                className="flex-grow flex-col-center rounded-l-sm bg-indigo-700 px-0.5"
                onClick={() => setOpen(!open)}
              >
                <ArrowDown01Icon
                  className={cn(
                    "text-white size-4 transition-all",
                    open ? "rotate-180" : ""
                  )}
                />
              </button>
            )}
          </PopoverTrigger>
          <PopoverContent
            onClick={(e) => e.stopPropagation()}
            align="start"
            className="w-40 p-1 flex-col-center gap-1"
          >
            {content({ open, setOpen })}
          </PopoverContent>
        </Popover>
      </div>
    </ClickAwayListener>
  );
};

export default ActionsButton;
