import React from "react";
import Editor from "./components/Editor";
import cloudinary from "@/lib/cloudinary";

const extractProductFolder = (product) => {
  if (product.startsWith("הזמנה לחתונה")) {
    return "חתונה";
  } else if (product.startsWith("הזמנה לבר מצווה")) {
    return "בר מצווה";
  } else if (product.startsWith("הזמנה לבת מצווה")) {
    return "בת מצווה";
  } else if (product.startsWith("הזמנה לברית")) {
    return "ברית";
  } else if (product.startsWith("הזמנה בריתה")) {
    return "בריתה";
  } else {
    return null; // החזרת null אם לא נמצא התאמה
  }
};

const Page = async ({ params }) => {
  const { product } = params;
  const decodedProduct = decodeURIComponent(product);
  try {
    const folderName = extractProductFolder(decodedProduct);

    const [
      { imageUrl_1 },
      { imageUrl_2 },
    ] = await cloudinary.api
      .resources_by_ids([
        `הזמנות/${folderName}/רקעים/${decodedProduct}-ב`,
        `הזמנות/${folderName}/רקעים/${decodedProduct}-א`,
      ])
      .then((res) => {
        const { resources } = res;
        return resources.map((resource) => {
          if (resource.public_id.includes("-א")) {
            return { imageUrl_1: resource.secure_url };
          } else {
            return { imageUrl_2: resource.secure_url };
          }
        });
      });

    return <Editor imageUrl_1={imageUrl_1} imageUrl_2={imageUrl_2} />;
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
};

export default Page;
