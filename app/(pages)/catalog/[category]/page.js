import React from "react";
import Products from "./components/Products";
import cloudinary from "@/lib/cloudinary";
import Breadcrumbs from "@/app/ui/Breadcrumbs";
import Link from "next/link";

const ng_url_1 =
  "https://img.freepik.com/premium-photo/photograph-ritual-jewish-objects-including-prayer-vestments-with-hebrew-inscription-reading-1-object-symbols-read-tefillin-hand-on2-they-read-tefillin-head_329479-1805.jpg?w=1480";

const ng_url_2 =
  "https://img.freepik.com/premium-photo/tallit-tefillin-white-background_329479-1027.jpg?w=1480";

const items = [
  { title: "קטלוג", href: "/catalog", withSeparator: true },
  { title: "בית", href: "/" },
];

const Page = async ({ params }) => {
  const { category } = params;
  const decodedCategory = decodeURIComponent(category);

  try {
    const { resources } = await cloudinary.api.resources_by_asset_folder(
      `הזמנות/${decodedCategory}/תצוגה`, {
        max_results: 1000,
      }
    );

    const products = resources.map((product) => {
      const title = product.public_id.split("/")[3];
      return {
        imageUrl: product.secure_url,
        title,
      };
    });

    return (
      <div className="relative size-full bg-indigo-50 flex-col-center justify-start overflow-auto">
        <div className="absolute top-0 w-full h-72 p-8 flex-col-center gap-2 bg-indigo-700">
          {/* ניווט עמודים */}
          <div className="z-10 flex-col-center gap-1">
            <Breadcrumbs items={items} />
            <h1 className="text-white text-center">{`הזמנות ל${decodedCategory}`}</h1>
          </div>
          <img
            src={ng_url_2}
            className="absolute inset-0 object-cover size-full opacity-15"
          />
        </div>

        <Products prod={products} category={decodedCategory} />
      </div>
    );
  } catch (error) {
    console.log("error: ", error);
    return (
      <div className="size-full flex-col-center gap-4">
        <h1>בקרוב!</h1>
        <Link
          href="/catalog"
          className="bg-indigo-600 text-indigo-50 px-4 py-2 rounded-sm hover:bg-indigo-700 active:bg-indigo-800"
        >
          חזרה לקטגוריות
        </Link>
      </div>
    );
  }
};

export default Page;
