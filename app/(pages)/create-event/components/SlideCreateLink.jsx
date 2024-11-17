"use client";

import Loader from "@/app/ui/Loader";
import { invitation_details_Atom } from "@/lib/jotai";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAtom, useAtomValue } from "jotai";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

const getTitle = (invitationDetails) => {
  if (invitationDetails?.eventType === "חתונה") {
    return `הזמנה לחתונה של ${invitationDetails?.groom_name} ו${invitationDetails?.bride_name}`;
  } else if (invitationDetails?.eventType === "בר מצווה") {
    return `הזמנה לבר המצווה של ${invitationDetails?.groom_name}`;
  } else if (invitationDetails?.eventType === "בת מצווה") {
    return `הזמנה לבת המצווה של ${invitationDetails?.bride_name}`;
  } else {
    return invitationDetails?.parents;
  }
};
const SlideCreateLink = ({ carouselApi }) => {
  const { data: session } = useSession();
  console.log("session: ", session);
  const invitationDetails = useAtomValue(invitation_details_Atom);
  const [link, setLink] = useState("");

  console.log("invitationDetails: ", invitationDetails);

  const createEventMutation = useMutation({
    mutationFn: async ({
      linkedUserId,
      eventType,
      linkedEmail,
      title,
      client,
      waze,
      googleMap,
      date,
      img_1,
      img_2,
    }) => {
      const formData = new FormData();
      formData.append("linkedUserId", linkedUserId);
      formData.append("eventType", eventType);
      formData.append("linkedEmail", linkedEmail);
      formData.append("title", title);
      formData.append("client", client);
      formData.append("waze", waze);
      formData.append("googleMap", googleMap);
      formData.append("date", date);
      formData.append("img_1", img_1);
      formData.append("img_2", img_2);

      console.log("img_1: ", img_1);

      const res = await axios.post("/api/events", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("res: ", res);
      return res;
    },
  });

  const createLink = async () => {
    const linkedEmail = session?.user?.email;
    const client = session?.user?.name;
    const linkedUserId = session?.user?.id;

    const eventType = invitationDetails?.eventType;
    const date = invitationDetails?.date;
    const img_1 = invitationDetails?.img_1;
    const img_2 = invitationDetails?.img_2;
    const title = getTitle(invitationDetails);
    const waze = encodeURIComponent(invitationDetails.wazeLink);
    const googleMap = encodeURIComponent(invitationDetails.googleMapsLink);

    const event = createEventMutation.mutateAsync({
      linkedEmail,
      eventType,
      linkedUserId,
      title,
      client,
      waze,
      googleMap,
      date,
      img_1,
      img_2,
    });

    console.log("event: ", event);

    const link = `https://www.mazaltov-rsvp.co.il/invitation?email=${linkedEmail}&client=${client}&title=${title}&name=${name}&waze=${waze}&gm=${googleMap}&img_1=${img_1}&img_2=${img_2}`;

    console.log("link: ", link);

    setLink(link);
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
    </div>
  );
};

export default SlideCreateLink;
