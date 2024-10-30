import React from "react";
import Products from "./components/Products";
import cloudinary from "@/lib/cloudinary";

const ng_url_1 =
  "https://img.freepik.com/premium-photo/photograph-ritual-jewish-objects-including-prayer-vestments-with-hebrew-inscription-reading-1-object-symbols-read-tefillin-hand-on2-they-read-tefillin-head_329479-1805.jpg?w=1480";

const ng_url_2 =
  "https://img.freepik.com/premium-photo/tallit-tefillin-white-background_329479-1027.jpg?w=1480";

const translateCategory = (category) => {
  switch (category) {
    case "weddinng":
      return "חתונה";
    case "bar-mitzva":
      return "בר מצווה";
    case "bar-mitzva":
      return "בת מצווה";
    case "brit":
      return "ברית";
    case "brita":
      return "בריתה";
  }
};

const Page = async ({ params }) => {
  const { category } = params;
  const decodedCategory = decodeURIComponent(category);

  try {
    const { resources } = await cloudinary.api.resources_by_asset_folder(
      `הזמנות/${decodedCategory}/תצוגה`
    );

    const images = resources.map((resource) => {
      const title = resource.public_id.split("/")[3];
      return {
        imageUrl: resource.secure_url,
        title,
      };
    });

    return (
      <div className="relative size-full bg-indigo-50 flex-col-center justify-start overflow-auto">
        <div className="flex-center p-8 bg-indigo-700 w-full h-72 absolute top-0">
          <h1 className="text-white text-center">{decodedCategory}</h1>
          <img
            src={ng_url_2}
            className="absolute inset-0 object-cover size-full opacity-15"
          />
        </div>

        <Products images={images} category={decodedCategory} />
      </div>
    );
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
};

export default Page;
