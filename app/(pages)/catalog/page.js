import Breadcrumbs from "@/app/ui/Breadcrumbs";
import cloudinary from "@/lib/cloudinary";
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
    imageKey: "רקע חתונה",
    link: "/catalog/חתונה",
    description: "",
  },
  {
    id: 2,
    name: "הזמנות לבר מצווה",
    imageKey: "רקע בר מצווה",
    link: "/catalog/בר מצווה",
    description: "",
  },
  {
    id: 3,
    name: "הזמנות לבת מצווה",
    imageKey: "רקע בת מצווה",
    link: "/catalog/בת מצווה",
    description: "",
  },
  {
    id: 4,
    name: "הזמנות לברית",
    imageKey: "רקע ברית",
    link: "/catalog/ברית",
    description: "",
  },
  {
    id: 5,
    name: "הזמנות לבריתה",
    imageKey: "רקע בריתה",
    link: "/catalog/בריתה",
    description: "",
  },
];

const items = [{ title: "בית", href: "/" }];

const findImageUrl = () => {
  const { secure_url: imageUrl } = resources.find(
    ({ display_name }) => display_name === imageKey
  );
  return imageUrl;
};

const Page = async () => {
  const { resources } = await cloudinary.api.resources_by_ids(
    [
      `assets/רקע חתונה`,
      `assets/רקע בר מצווה`,
      `assets/רקע בת מצווה`,
      `assets/רקע ברית`,
      `assets/רקע בריתה`,
    ],
    {
      //fields: ["secure_url", "display_name"],
    }
  );

  return (
    <div className="relative size-full p-8 flex-center bg-indigo-50 overflow-auto">
      <div className="absolute top-0 w-full h-72 p-8 flex-col-center gap-2 bg-indigo-700">
        {/* ניווט עמודים */}
        <div className="z-10 flex-col-center gap-1">
          <Breadcrumbs items={items} />
          <h1 className="text-white text-center">קטגוריות</h1>
        </div>
        <img
          src={ng_url_2}
          className="absolute inset-0 object-cover size-full opacity-15"
        />
      </div>

      <div className="size-full max-w-5xl mt-96 grid grid-cols-3 grid-rows-2 gap-4">
        {categories.map(({ link, name, id, imageKey }, i) => {
          const { imageUrl } = findImageUrl(imageKey);

          return (
            <Link key={id} href={link} className="z-10 size-full rounded-xl">
              <div className="relative h-full shadow-xl shadow-transparent hover:shadow-indigo-200 hover:scale-105 duration-500 flex-col-center gap-2 bg-white p-2 rounded-lg transition-all">
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
    </div>
  );
};

export default Page;
