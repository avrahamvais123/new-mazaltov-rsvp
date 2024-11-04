"use client";

import Image from "next/image";
import React from "react";

const EditorHeader = ({ editor }) => {
  return (
    <div className="w-full h-20 flex-center justify-between p-2 bg-slate-800">
      <Image
        src="/images/לוגו.png"
        alt="לוגו מזל טוב אישורי הגעה"
        width={60}
        height={60}
        priority
        className="p-2 my-2 aspect-square"
      />
      <button className="ml-6 px-4 py-1.5 bg-indigo-600 hover:brightness-90 active:brightness-75 transition-all text-white rounded-sm">
        שמירה
      </button>
    </div>
  );
};

export default EditorHeader;
