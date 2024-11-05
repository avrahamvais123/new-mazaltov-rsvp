"use client";

import { FavouriteIcon } from "@/app/icons/icons";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Products = ({ category, prod }) => {
  console.log("category: ", category);
  const [products, setProducts] = useState([]);
  console.log('products: ', products);

  useEffect(() => {
    setProducts(prod);
  }, [prod]);

  return (
    <div className="z-10 h-fit w-full max-w-6xl mt-52 p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 auto-rows-auto items-start gap-8">
      {products.map(({ title, imageUrl }, i) => {
        return (
          <div
            key={title}
            className="z-10 relative h-96 shadow-xl shadow-transparent hover:shadow-indigo-200 hover:scale-105 duration-500 flex-col-center gap-2 bg-white p-2 rounded-lg transition-all"
          >
            {/* <div className="absolute inset-0 w-full h-10 bg-indigo-600 rounded-t-md" /> */}

            <FavouriteIcon className="z-10 absolute top-6 right-6 cursor-pointer text-red-600 transition-all size-4 hover:animate-bounce hover:scale-150 active:scale-100 duration-500" />

            <div className="relative size-full rounded-lg">
              <Image
                src={imageUrl}
                alt="product image"
                sizes="100%"
                fill
                priority
                className="object-cover rounded-lg"
              />
            </div>

            <div className="flex-col-center gap-1 p-4">
              <h4>{title}</h4>
              <p className="-mt-2 mb-2">בחרו הזמנה וכנסו לעצב</p>
              <Link
                href={`/editor/${products[i].title}`}
                className="w-full text-center bg-indigo-700 hover:bg-indigo-800 hover:scale-110 active:scale-90 active:bg-indigo-900 text-indigo-50 transition-all duration-500 rounded-sm px-4 py-1.5"
              >
                כנס לעיצוב
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Products;

/* const api = new WooCommerceRestApi({
  url: "https://hazmanot-mazaltov.com",
  consumerKey: process.env.NEXT_PUBLIC_WC_CONSUMER_KEY,
  consumerSecret: process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET,
  version: "wc/v3",
}); */

/* useEffect(() => {
    console.log("api: ", api);
    fetchOrders();
    fetchFromWp();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("products", {
        per_page: 100,
        search: "הזמנה לבר מצווה", // כאן אפשר לשלוח את שם המוצר לחיפוש
      });
      console.log("res.data: ", res.data);
      setNewProducts(
        res.data.map(({ id, name, images }) => {
          const imageUrl = images.filter(({ name }) =>
            name.includes("תצוגה")
          )[0]?.src;
          return {
            id,
            title: name,
            imageUrl: imageUrl,
          };
        })
      );
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const fetchFromWp = async () => {
    try {
      const res = await axios.get(
        "https://hazmanot-mazaltov.com/wp-json/wp/v2/media",
        {
          params: {
            per_page: 100, // מספר התמונות בכל בקשה
            search: "הזמנה לבר מצווה", // מונח החיפוש
          },
        }
      );
      console.log("Filtered Media: ", res.data);
    } catch (error) {
      console.log("Error fetching filtered media: ", error);
    }
  }; */
