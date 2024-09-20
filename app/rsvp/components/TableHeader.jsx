"use client";

import { Add01Icon, RefreshIcon } from "@/app/icons/icons";
import { cn } from "@/lib/utils";
import axios from "axios";
import React from "react";
import AddGuest from "./AddGuest";

const TableHeader = () => {
  const getAllGuests = async () => {
    try {
      const res = await axios.get("/api/guests");
      console.log("res: ", res);
    } catch (error) {
      console.error(
        "Error getting all guests: ",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="w-full flex-center justify-between gap-2">
      {/* title */}
      <h1 className="text-xl text-slate-400 font-medium">טבלת מוזמנים</h1>

      {/* buttons */}
      <div className="flex-center gap-2">
        <AddGuest />

        <button
          onClick={getAllGuests}
          className={cn(
            "bg-indigo-600 text-white",
            "px-4 py-2 rounded-sm flex-center gap-2"
          )}
        >
          <RefreshIcon className="size-4 text-white" />
          קבלת כל המוזמנים
        </button>
      </div>
    </div>
  );
};

export default TableHeader;
