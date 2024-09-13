"use client";

import DropZoneUploader from "@/app/ui/DropZoneUploader";
import MyUploader from "@/app/ui/MyUploader";
import React from "react";

const SlideUploadImage = ({ setSteps, carouselApi }) => {
  return <MyUploader setSteps={setSteps} carouselApi={carouselApi} />;
};

export default SlideUploadImage;
