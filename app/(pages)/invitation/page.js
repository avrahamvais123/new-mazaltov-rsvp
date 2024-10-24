import React from "react";
import Image from "next/image";
import InvitaionForm from "./components/InvitaionForm";
import Link from "next/link";

const Page = () => {
  return (
    <div className="size-full p-6 md:p-10 flex-col-center justify-start gap-4 md:gap-8 overflow-auto">
      <h1 className="text-center">הזמנה לבר המצווה של ינון קצב</h1>
      <Image
        src="/images/ג׳קי קצב-01.jpg"
        alt="הזמנה לבר מצווה צד 1"
        height={500}
        width={500}
      />
      <Image
        src="/images/ג׳קי קצב-02.jpg"
        alt="הזמנה לבר מצווה צד 2"
        height={500}
        width={500}
      />
      <InvitaionForm />
      <Link
        href="https://ul.waze.com/ul?place=ChIJG1cQcoo3HRUR2_WTdTdihbw&ll=32.11318290%2C34.90464740&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location"
        className="relative size-20 aspect-square p-4 rounded-full"
      >
        <Image src="/images/waze-logo.png" alt="הזמנה לבר מצווה צד 2" fill />
      </Link>
    </div>
  );
};

export default Page;
