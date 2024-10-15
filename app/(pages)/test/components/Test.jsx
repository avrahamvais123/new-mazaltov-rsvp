"use client";

import React from "react";
import MyButton from "./MyButton";
import { red } from "tailwindcss/colors";
import { green } from "tailwindcss/colors";

const Test = () => {
  return (
    <div className="flex-center gap-2">
      <MyButton className="bg-green-500 text-white">אישור</MyButton>
      <MyButton>ביטול</MyButton>
    </div>
  );
};

export default Test;
