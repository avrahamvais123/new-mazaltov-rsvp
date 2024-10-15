"use client";

import React from "react";
import MyButton from "./MyButton";
import MyInput from "./MyInput";

const Test = () => {
  return (
    <div className="size-full flex-col-center justify-start gap-2">
      {/* כפתורים */}
      <div className="flex-col-center gap-2 p-4">
        <h1 className="text-2xl font-bold">כפתורים</h1>
        <span className="flex-center gap-2">
          <MyButton className="bg-green-500 text-white">אישור</MyButton>
          <MyButton>ביטול</MyButton>
        </span>
      </div>

      <div className="border w-full" />

      {/* שדה קלט */}
      <div className="flex-col-center gap-2 p-4">
      <h1 className="text-2xl font-bold">שדה קלט</h1>
        <MyInput name="אילה" />
      </div>
    </div>
  );
};

export default Test;
