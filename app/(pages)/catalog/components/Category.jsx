"use client";

import MyDialog from "@/app/ui/MyDialog";
import MyForm from "@/app/ui/MyForm";
import {
  catalog_editingMode_Atom,
  catalog_openCategory_Atom,
} from "@/lib/jotai";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom, useAtomValue } from "jotai";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useClickAway } from "react-use";

const CustomTrigger = ({ open, setOpen }) => {
  return (
    <button
      className={cn(
        "px-3 py-1 rounded-sm",
        "bg-slate-50 text-indigo-600",
        "hover:bg-slate-100",
        "active:bg-slate-200",
        "transition-all"
      )}
      onClick={() => setOpen(!open)}
    >
      עריכה
    </button>
  );
};

const fields = [
  {
    type: "text",
    name: "name",
    label: "שם הקטגוריה",
    placeholder: "שם הקטגוריה",
    required: true,
    span: 12,
  },
  /* {
    type: "upload",
    name: "upload-image",
    label: "תמונת מוצר",
    placeholder: "תמונת מוצר",
    required: true,
    onSubmit: (data) => {
      console.log("data from image: ", data);
    },
    span: 12,
  }, */
];

const Category = ({ link, name, imageUrl }) => {
  const editingMode = useAtomValue(catalog_editingMode_Atom);
  const [openCategory, setOpenCategory] = useAtom(catalog_openCategory_Atom);
  const form = useForm();
  const productRef = useRef();

  useClickAway(productRef, () => {
    setOpenCategory(null);
  });

  const onSubmit = (data) => {
    console.log("data: ", data);
  };

  return (
    <Link href={link} className="z-10 relative size-full rounded-xl">
      {editingMode && (
        <div
          onClick={(e) => {
            e.preventDefault();
          }}
          onMouseEnter={() => (!openCategory ? setOpenCategory(name) : null)}
          className="z-10 absolute inset-0 size-full flex-col-center gap-2 rounded-lg"
        >
          <AnimatePresence>
            {openCategory === name && (
              <motion.div
                ref={productRef}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.2, ease: "easeIn" }}
                className="size-full p-4 bg-white/75 rounded-lg flex-col-center gap-2"
              >
                <MyForm
                  form={form}
                  submitName="עדכן"
                  customSubmit={
                    <button
                      type="submit"
                      onClick={form?.handleSubmit(onSubmit)}
                      className={cn(
                        "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 transition-all text-indigo-50 px-4 py-2 rounded-sm"
                      )}
                    >
                      עדכן
                    </button>
                  }
                  fields={fields}
                  classNames={{ form: "z-10" }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
      <div className="relative h-full shadow-xl shadow-transparent hover:shadow-indigo-200 hover:scale-105 duration-500 flex-col-center gap-2 bg-white p-2 rounded-lg transition-all">
        <div className="relative size-full aspect-video rounded-lg">
          <Image
            src={imageUrl}
            alt="product image"
            fill
            priority
            sizes="100%"
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
};

export default Category;

{
  /* <div className="z-20 absolute top-10 right-10 size-fit">
  <MyDialog
    customTrigger={CustomTrigger}
    open={open}
    setOpen={setOpen}
    title="עריכת קטגוריה"
  />
</div>; */
}
