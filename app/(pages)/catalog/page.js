import Breadcrumbs from "@/app/ui/Breadcrumbs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ng_url_1 =
  "https://img.freepik.com/premium-photo/photograph-ritual-jewish-objects-including-prayer-vestments-with-hebrew-inscription-reading-1-object-symbols-read-tefillin-hand-on2-they-read-tefillin-head_329479-1805.jpg?w=1480";

const ng_url_2 =
  "https://img.freepik.com/premium-photo/tallit-tefillin-white-background_329479-1027.jpg?w=1480";

const categories = [
  {
    id: 1,
    name: "הזמנות לחתונה",
    imageUrl: ng_url_1,
    link: "/catalog/חתונה",
    description: "",
  },
  {
    id: 2,
    name: "הזמנות לבר מצווה",
    imageUrl: ng_url_1,
    link: "/catalog/בר מצווה",
    description: "",
  },
  {
    id: 3,
    name: "הזמנות לבת מצווה",
    imageUrl: ng_url_1,
    link: "/catalog/בת מצווה",
    description: "",
  },
  {
    id: 4,
    name: "הזמנות לברית",
    imageUrl: ng_url_1,
    link: "/catalog/ברית",
    description: "",
  },
  {
    id: 5,
    name: "הזמנות לבריתה",
    imageUrl: ng_url_1,
    link: "/catalog/בריתה",
    description: "",
  },
];

const Page = async () => {
  return (
    <div className="relative size-full bg-indigo-50 flex-center justify-start overflow-auto">
      <div className="absolute top-0 w-full h-72 p-8 flex-col-center gap-2 bg-indigo-700">
        <Breadcrumbs />
        <h1 className="text-white text-center">קטגוריות</h1>
        <img
          src={ng_url_2}
          className="pointer-events-none absolute inset-0 object-cover size-full opacity-15"
        />
      </div>

      {categories.map(({ link, name, id, imageUrl }, i) => {
        return (
          <Link
            key={id}
            href={link}
            className="z-10 h-fit w-full max-w-6xl mt-52 p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 auto-rows-auto items-start gap-8"
          >
            <div className="z-10 relative h-96 shadow-xl shadow-transparent hover:shadow-indigo-200 hover:scale-105 duration-500 flex-col-center gap-2 bg-white p-2 rounded-lg transition-all">
              {/* <div className="absolute inset-0 w-full h-10 bg-indigo-600 rounded-t-md" /> */}

              <div className="relative size-full rounded-lg">
                <Image
                  src={imageUrl}
                  alt="product image"
                  fill
                  priority
                  className="object-cover rounded-lg"
                />
              </div>

              <div className="flex-col-center gap-1 p-4">
                <h4>{name}</h4>
                <p className="-mt-2 mb-2">בחרו הזמנה וכנסו לעצב</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Page;
