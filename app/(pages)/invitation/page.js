import React from "react";
import Image from "next/image";
import InvitaionForm from "./components/InvitaionForm";
import Link from "next/link";

export const metadata = {
  title: "הזמנה דיגיטלית לבר המצווה של ינון קצב",
  description: "הזמנה דיגיטלית לבר המצווה של ינון קצב",
};

const Page = ({ searchParams }) => {
  const email = searchParams.email;
  const client = searchParams.client;
  const title = searchParams.title;
  const name = searchParams.name;
  const img_1 = searchParams.img_1;
  const img_2 = searchParams.img_2;
  const waze = searchParams.waze;
  const gm = searchParams.gm;

  const data = {
    name,
    email,
    client,
    title,
    img_1,
    img_2,
    waze,
    gm,
  };

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

export default Page;
