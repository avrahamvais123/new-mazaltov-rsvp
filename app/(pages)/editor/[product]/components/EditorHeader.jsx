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
      <div className="">
        <button className=""></button>
        <button className=""></button>
      </div>
    </div>
  );
};

export default EditorHeader;
