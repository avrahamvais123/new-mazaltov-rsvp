"use client";

import { RefreshIcon, Delete02Icon } from "@/app/icons/icons";
import { cn } from "@/lib/utils";
import React from "react";
import AddGuest from "./AddGuest";
import RemoveGuests from "./RemoveGuests";

const TableHeader = ({ table, setData, getAllGuests, removeGuests }) => {
  return (
    <div className="w-full mb-3 mt-10 flex-center justify-between gap-2">
      {/* title */}
      <h1 className="text-xl text-slate-400 font-medium">טבלת מוזמנים</h1>

      {/* buttons */}
      <div className="flex-center gap-2">
        {/* add */}
        <AddGuest setData={setData} />

        {/* reload */}
        {/* <button
          onClick={() => getAllGuests.mutate()}
          className={cn(
            "bg-indigo-600 text-white",
            "p-2 rounded-sm flex-center gap-2"
          )}
        >
          <RefreshIcon className="size-4 text-white" />
        </button> */}

        {/* remove */}
        <RemoveGuests
          remove={() => {
            const guestsToRemove = table
              ?.getSelectedRowModel()
              .rows.map((row) => row?.id);

            removeGuests.mutate(guestsToRemove);
          }}
          CustomTrigger={({ setOpen }) => {
            return (
              <button
                onClick={() => {
                  setOpen(true);
                }}
                className={cn(
                  "bg-indigo-600 text-white",
                  "p-2 rounded-sm flex-center gap-2"
                )}
              >
                <Delete02Icon className="size-4 text-white" />
              </button>
            );
          }}
        />
      </div>
    </div>
  );
};

export default TableHeader;
