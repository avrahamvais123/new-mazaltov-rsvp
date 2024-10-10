"use client";

import MyDialog from "@/app/ui/MyDialog";
import React from "react";

const RemoveGuests = ({ CustomTrigger, remove }) => {
  const CustomSubmit = (props) => {
    return (
      <div className="flex-center gap-2">
        {/* ביטול */}
        <button
          className="px-4 py-2 rounded-sm hover:bg-slate-100 active:bg-slate-200 transition-all"
          onClick={() => props?.setOpen(false)}
        >
          ביטול
        </button>

        {/* אישור */}
        <button
          className="px-4 py-2 rounded-sm bg-red-600 text-white hover:bg-red-700 active:bg-red-800 transition-all"
          onClick={() => {
            remove();
            props?.setOpen(false);
          }}
        >
          אישור
        </button>
      </div>
    );
  };

  return (
    <MyDialog
      title="מחיקת מוזמנים"
      description="האם אתה בטוח שברצונך למחוק את המוזמנים"
      customSubmit={CustomSubmit}
      customTrigger={CustomTrigger}
    />
  );
};

export default RemoveGuests;
