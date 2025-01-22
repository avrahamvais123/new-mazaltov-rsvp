"use client";

import Image from "next/image";
import React from "react";
import InvitaionForm from "./InvitaionForm";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const Invitation = () => {
  const searchParams = useSearchParams();
  console.log("searchParams: ", searchParams);

  // גישה לפרמטרים מהכתובת
  const email = searchParams.get("email");
  const client = searchParams.get("client");
  const title = searchParams.get("title");
  const name = searchParams.get("name");
  const waze = searchParams.get("waze");
  const gm = searchParams.get("gm");
  const img_1 = searchParams.get("img_1");
  const img_2 = searchParams.get("img_2");
  return (
      <div className="size-full p-6 md:p-10 flex-col-center justify-start gap-4 md:gap-8 overflow-auto">
        <h1 className="text-center">
          {title}
          <br />
          {name}
        </h1>
        <Image
          src={img_1}
          alt="הזמנה לבר מצווה צד 1"
          height={500}
          width={500}
          priority
        />
        <Image
          src={img_2}
          alt="הזמנה לבר מצווה צד 2"
          height={500}
          width={500}
          priority
        />
        <InvitaionForm email={email} client={client} />

        <div className="flex-col-center gap-2">
          <h4>קישור לוויז</h4>
          <Link
            href={waze}
            className="relative size-20 aspect-square p-4 rounded-full hover:scale-75 transition-all duration-300"
          >
            <Image
              src="/images/waze-logo.png"
              alt="תמונת לוגו של וויז"
              fill
              sizes="100px"
            />
          </Link>
        </div>

        <div className="w-full h-fit flex-col-center gap-2">
          <h4>מפת הגעה לאולם</h4>
          <iframe
            src={gm}
            className="border-0 w-full h-48 md:h-96 max-w-4xl"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <p>
          נוצר ב-❤️ ע׳׳י מזל טוב אישורי הגעה מבית{" "}
          <Link
            href="https://hazmanot-mazaltov.com/"
            className="text-indigo-600 hover:text-indigo-400"
          >
            הזמנות מזל טוב
          </Link>
        </p>
      </div>
  );
};

export default Invitation;
