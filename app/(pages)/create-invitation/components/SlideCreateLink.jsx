"use client";

import { invitation_details_Atom } from "@/lib/jotai";
import { useAtom, useAtomValue } from "jotai";
import Link from "next/link";
import React, { useState } from "react";

const SlideCreateLink = ({ carouselApi }) => {
  const invitationDetails = useAtomValue(invitation_details_Atom);
  const [link, setLink] = useState("");
  const [localLink, setLocalLink] = useState("");

  console.log("invitationDetails: ", invitationDetails);

  const createLink = () => {
    if (!carouselApi) return;

    const name = encodeURIComponent(invitationDetails.name);
    const client = encodeURIComponent(name);
    const email = encodeURIComponent(invitationDetails.email);
    const title = encodeURIComponent(
      `הזמנה ל${invitationDetails.eventType} של ${name}`
    );
    const waze = encodeURIComponent(invitationDetails.wazeLink);
    const googleMap = encodeURIComponent(invitationDetails.googleMapsLink);
    const img_1 = encodeURIComponent(invitationDetails.img_1.previewUrl);
    const img_2 = encodeURIComponent(invitationDetails.img_2.previewUrl);

    const link = `https://www.mazaltov-rsvp.co.il/invitation?email=${email}&client=${client}&title=${title}&name=${name}&waze=${waze}&gm=${googleMap}&img_1=${img_1}&img_2=${img_2}`;
    const localLink = `https://localhost:3000/invitation?email=${email}&client=${client}&title=${title}&name=${name}&waze=${waze}&gm=${googleMap}&img_1=${img_1}&img_2=${img_2}`;

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

      <Link href={link} className="">
        לינק אמיתי
      </Link>
      <Link href={localLink} className="">
        לינק לבדיקה
      </Link>
    </div>
  );
};

export default SlideCreateLink;
