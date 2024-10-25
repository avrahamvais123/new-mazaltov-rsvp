"use client";

import MyUploader from "@/app/ui/MyUploader";
import { eventAtom } from "@/lib/jotai";
import { useAtom } from "jotai";
import React from "react";

const SlideUploadImage = ({ setSteps, carouselApi }) => {
  const [event, setEvent] = useAtom(eventAtom);

  const onSubmit = (files) => {
    const allFiles = files.map((f) => f.meta);

    setEvent((prev) => {
      return { ...prev, image1: allFiles[0], image2: allFiles[1], price: 120 };
    });

    setSteps((prev) =>
      prev.map((step) =>
        step.id === 1
          ? { ...step, status: "complete" }
          : step.id === 2
          ? { ...step, status: "current" }
          : step
      )
    );

    carouselApi.scrollNext();
  };

  return (
    <>
      <MyUploader onSubmit={onSubmit} />
    </>
  );
};

export default SlideUploadImage;

/* <button
        onClick={() => {
          setSteps((prev) =>
            prev.map((step) =>
              step.id === 1
                ? { ...step, status: "complete" }
                : step.id === 2
                ? { ...step, status: "current" }
                : step
            )
          );

          carouselApi.scrollNext();
        }}
        className=""
      >
        next
      </button> */
