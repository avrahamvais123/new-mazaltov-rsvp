"use client";

import { cn } from "@/lib/utils";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnimatePresence, motion } from "framer-motion";

const actions = [
  (key) => (
    <Select key={key} dir="rtl">
      <SelectTrigger className="w-[180px] h-full">
        <SelectValue placeholder="בחר סוג פונט" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
];

const ToolBar = ({ editor, showToolbar, setShowToolbar }) => {
  return (
    <AnimatePresence>
      {showToolbar && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          className="z-10 absolute-center top-6 w-[90%] h-10 mt-2 p-1 flex-center justify-start rounded-sm shadow-md shadow-slate-200 border border-slate-100 bg-white"
        >
          {actions.map((Component, i) => {
            return <Component key={i} />;
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ToolBar;
