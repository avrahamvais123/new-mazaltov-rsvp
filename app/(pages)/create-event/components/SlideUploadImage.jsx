"use client";

import {  invitation_details_Atom } from "@/lib/jotai";
import { useSetAtom } from "jotai";
import { useSession } from "next-auth/react";
import React from "react";
import MyDropzone from "@/app/ui/my-dropzone/MyDropzone";

const SlideUploadImage = ({ setSteps, carouselApi }) => {
  const setInvitationDetails = useSetAtom(invitation_details_Atom);

  const onSubmit = (files) => {
    console.log("files: ", files);
    const allFiles = files.map((f) => f.file);

    setInvitationDetails(() => ({
      img_1: allFiles[0],
      img_2: allFiles[1],
      price: 120,
    }));

    setSteps((prev) =>
      prev.map((step) =>
        step.id === 1
          ? { ...step, status: "complete" }
          : step.id === 2
          ? { ...step, status: "current" }
          : step
      )
    );

    carouselApi?.scrollNext();
  };

  return <MyDropzone onSubmit={onSubmit} />;
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
        carouselApi?.scrollNext();
      }}
      className=""
    >
      click
    </button> */

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
