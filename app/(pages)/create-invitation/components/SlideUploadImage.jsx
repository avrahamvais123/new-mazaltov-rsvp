"use client";

import MyUploader from "@/app/ui/MyUploader";
import { eventAtom, invitation_details_Atom } from "@/lib/jotai";
import { useSetAtom } from "jotai";
import { useSession } from "next-auth/react";
import React from "react";

const SlideUploadImage = ({ setSteps, carouselApi }) => {
  const setInvitationDetails = useSetAtom(invitation_details_Atom);
  const { data: sessions } = useSession();

  const onSubmit = (files) => {
    const allFiles = files.map((f) => f.meta);
    const publicId = sessions?.user?.id;
    allFiles[0].publicId = `${publicId}-1`;
    allFiles[1].publicId = `${publicId}-2`;
    console.log("allFiles: ", allFiles);

    setInvitationDetails((prev) => ({
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

  return <MyUploader onSubmit={onSubmit} />;
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
