"use client";

import React, { useState } from "react";
import MyRadioGroup from "@/app/ui/MyRadioGroup";
import { useForm } from "react-hook-form";
import MyForm from "@/app/ui/Form";
import localforage from "localforage";

const fields = [
  {
    type: "radioGroup",
    name: "sms",
    title: "בחר כמות מוזמנים",
    options: [
      { text: "עד 100 מוזמנים", value: 50, description: "תוספת 50 ש׳׳ח" },
      { text: "עד 200 מוזמנים", value: 100, description: "תוספת 100 ש׳׳ח" },
      { text: "עד 300 מוזמנים", value: 150, description: "תוספת 150 ש׳׳ח" },
    ],
    classNames: {
      wrapper: "",
    },
  },
];

const SlideOptions = ({ setSteps, carouselApi }) => {
  const onSubmit = (data) => {
    console.log("data: ", data);
    localforage.setItem("sms", data.sms);
    carouselApi.scrollNext();
  };

  return (
    <div className="size-full p-4 flex-col-center">
      <MyForm
        onSubmit={onSubmit}
        fields={fields}
        classNames={{
          form: "w-full p-4 flex-col-center rounded-sm",
        }}
        Submit={
          <button
            type="submit"
            className="w-full p-3 mt-5 text-lg bg-indigo-600 text-indigo-50 rounded-sm"
          >
            הבא
          </button>
        }
      />
    </div>
  );
};

export default SlideOptions;
