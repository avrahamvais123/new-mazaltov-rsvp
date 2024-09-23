"use client";

import React, { useState } from "react";
import MyForm from "@/app/ui/MyForm";
import { eventAtom } from "@/lib/jotai";
import { useAtom } from "jotai";
import localforage from "localforage";

const fields = [
  {
    type: "radioGroup",
    name: "sms",
    title: "בחר כמות מוזמנים",
    options: [
      {
        text: "עד 100 מוזמנים",
        amountSms: 100,
        value: 50,
        description: "תוספת 50 ש׳׳ח",
      },
      {
        text: "עד 200 מוזמנים",
        amountSms: 200,
        value: 100,
        description: "תוספת 100 ש׳׳ח",
      },
      {
        text: "עד 300 מוזמנים",
        amountSms: 300,
        value: 150,
        description: "תוספת 150 ש׳׳ח",
      },
    ],
    classNames: {
      wrapper: "",
    },
  },
];

const SlideOptions = ({ setSteps, carouselApi }) => {
  const [event, setEvent] = useAtom(eventAtom);

  const onSubmit = async (data) => {
    const updatedPrice = event.price + Number(data?.sms);

    const amountSms = fields()[0].options.filter(
      (option) => option.value == data?.sms
    )[0].amountSms;

    setEvent((prev) => {
      return { ...prev, sms: amountSms, price: updatedPrice };
    });

    await localforage.setItem("event-price", updatedPrice);

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
        customSubmit={
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
