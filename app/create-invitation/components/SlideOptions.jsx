"use client";

import MyCheckbox from "@/app/ui/MyCheckbox";
import React from "react";
import MyRadioGroup2 from "@/app/ui/MyRadioGroup2";

const SlideOptions = ({ setSteps, carouselApi }) => {
  return (
    <div className="size-full p-4 flex-col-center">
      <MyRadioGroup2 />
    </div>
  );
};

export default SlideOptions;
