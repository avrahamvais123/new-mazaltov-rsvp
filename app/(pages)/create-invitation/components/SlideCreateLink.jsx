"use client";

import Loader from "@/app/ui/Loader";
import { invitation_details_Atom } from "@/lib/jotai";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAtom, useAtomValue } from "jotai";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

const getName = (invitationDetails) => {
  if (invitationDetails?.eventType === "חתונה") {
    return `${invitationDetails?.groom_name} ו${invitationDetails?.bride_name}`;
  } else if (invitationDetails?.eventType === "בר מצווה") {
    return invitationDetails?.groom_name;
  } else if (invitationDetails?.eventType === "בת מצווה") {
    return invitationDetails?.bride_name;
  } else {
    return invitationDetails?.parents;
  }
};
const SlideCreateLink = ({ carouselApi }) => {
  const { data: session } = useSession();
  console.log("session: ", session);
  const invitationDetails = useAtomValue(invitation_details_Atom);
  const [link, setLink] = useState("");
  const [localLink, setLocalLink] = useState("");

  console.log("invitationDetails: ", invitationDetails);

  const uploadImage = async ({ file, public_id }) => {
    console.log("public_id: ", public_id);
    console.log("file: ", file);
    const formData = new FormData();
    formData.append("file", file); // קובץ התמונה
    formData.append("public_id", public_id); // ID ייחודי לתמונה
    formData.append("folder", "mazaltov-rsvp/invitations"); // תיקייה בקלאודינרי

    try {
      const response = await axios.post("/api/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload success:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error uploading image:",
        error.response?.data || error.message
      );
    }
  };

  const uploadImageMutation = useMutation({
    mutationFn: async ({ file, public_id }) => {
      const res = await uploadImage({ file, public_id });
      console.log("res: ", res);
      return res?.data?.secure_url;
    },
    onSuccess: async (secure_url) => {
      console.log("Mutation success: ", secure_url);
    },
    onError: (error, variables) => {
      console.error("Mutation error: ", error);
    },
  });

  const createLink = async () => {
    const name = getName(invitationDetails);
    console.log("name: ", name);
    const email = encodeURIComponent(invitationDetails.email);
    const client = encodeURIComponent(name);
    const title = encodeURIComponent(
      `הזמנה ל${invitationDetails.eventType} של`
    );
    const waze = encodeURIComponent(invitationDetails.wazeLink);
    const googleMap = encodeURIComponent(invitationDetails.googleMapsLink);

    const public_id_1 = `${session?.user?.id}-1`;
    const public_id_2 = `${session?.user?.id}-2`;

    const img_1 = await uploadImageMutation.mutateAsync({
      file: invitationDetails.img_1,
      public_id: public_id_1,
    });

    const img_2 = await uploadImageMutation.mutateAsync({
      file: invitationDetails.img_2,
      public_id: public_id_2,
    });

    const link = `https://www.mazaltov-rsvp.co.il/invitation?email=${email}&client=${client}&title=${title}&name=${name}&waze=${waze}&gm=${googleMap}&img_1=${img_1}&img_2=${img_2}`;
    const localLink = `localhost:3000/invitation?email=${email}&client=${client}&title=${title}&name=${name}&waze=${waze}&gm=${googleMap}&img_1=${img_1}&img_2=${img_2}`;

    console.log("localLink: ", localLink);
    console.log("link: ", link);

    setLink(link);
    setLocalLink(localLink);
  };

  return (
    <div className="size-full flex-col-center">
      <button onClick={createLink} className="">
        יצירת קישור
      </button>

      <Link
        href={link}
        className={link ? "text-blue-600" : ""}
        target="_blank"
        rel="noopener noreferrer"
      >
        לינק אמיתי
      </Link>
      <Link
        href={localLink}
        className={link ? "text-red-600" : ""}
        target="_blank"
        rel="noopener noreferrer"
      >
        לינק לבדיקה
      </Link>
    </div>
  );
};

export default SlideCreateLink;
