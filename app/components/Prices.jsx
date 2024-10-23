"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import NumberInput from "../ui/NumberInput";

export default function Prices() {
  const [sms, setSms] = useState("70.00");
  const [whatsapp, setWhatsapp] = useState("200.00");

  const calculatePricePerSms = (value) => {
    let pricePerSms = 0.7;

    if (value >= 200 && value <= 299) {
      pricePerSms = 0.6;
    }

    if (value >= 300) {
      pricePerSms = 0.5;
    }

    return pricePerSms;
  };

  const calculatePricePerWhatsapp = (value) => {
    let pricePerWhatsapp = 2;

    if (value >= 200 && value <= 299) {
      pricePerWhatsapp = 1.8;
    }

    if (value >= 300) {
      pricePerWhatsapp = 1.5;
    }

    return pricePerWhatsapp;
  };

  const onChangeSms = (e) => {
    const value = Number(e.target.value);
    console.log("value: ", value);

    const pricePerSms = calculatePricePerSms(value);
    const useSystemPrice = 120;
    const totalPrice = value * pricePerSms; // מחיר כולל לפי כמות ה-SMS והמחיר ל-SMS

    setSms(totalPrice.toFixed(2));
  };

  const onChangeWhatsapp = (e) => {
    const value = Number(e.target.value);
    console.log("value: ", value);

    const pricePerWhatsapp = calculatePricePerWhatsapp(value);
    const useSystemPrice = 100;
    const totalPrice = value * pricePerWhatsapp; // מחי�� כו��ל לפי כמות ה-Whatsapp והמחי�� ל-Whatsapp

    setWhatsapp(totalPrice.toFixed(2));
  };

  const sendPrices = [
    {
      title: "מחירון סמס",
      label: "כמות הודעות סמס",
      value: sms,
      description: "",
      onChange: (e) => onChangeSms(e),
    },
    {
      title: "מחירון ווצאפ",
      label: "כמות הודעות ווצאפ",
      value: whatsapp,
      description: "",
      onChange: (e) => onChangeWhatsapp(e),
    },
  ];

  return (
    <div
      id="prices"
      className="relative my-20 w-[90%] flex-col-center rounded-md"
    >
      <div className="absolute-center size-full bg-white/5 rounded-md backdrop-blur-sm border border-white/10" />

      <div className="z-10 size-full p-10 flex-col-center gap-4">
        <h1 className="text-white text-center">מחשבון עלויות</h1>
        <p className="w-full text-center mb-2 md:w-96 text-white">
          אנא בחרו את כמות ההודעות שברצונכם לשלוח, והמחיר יחושב באופן אוטומטי
          בהתאם לבחירתכם.
        </p>

        <div className="flex-col-center md:flex-row gap-4 md:max-w-[46rem]">
          {sendPrices.map((item, idx) => {
            return (
              <div
                key={idx}
                className="size-fit p-6 flex-col-center gap-4 bg-indigo-800 text-white border border-indigo-800 rounded-md"
              >
                <h3 className="text-center">{item.title}</h3>

                <div className="flex-col-center gap-1">
                  <label
                    htmlFor="amount-messages"
                    className="w-full text-sm text-white"
                  >
                    {item.label}
                  </label>

                  <input
                    id="amount-messages"
                    type="number"
                    placeholder="בחר/י כמות סמס"
                    onChange={item.onChange}
                    defaultValue={100}
                    min={100}
                    step={50}
                    className={cn(
                      "w-full px-4 py-2 bg-transparent",
                      "border border-white/30 rounded-sm",
                      "focus:outline focus:outline-indigo-600 focus:border-indigo-600"
                    )}
                  />
                </div>

                <h3 className="">{`${item.value} ₪`}</h3>
              </div>
            );
          })}
        </div>

        <p className="w-full text-center mt-2 md:w-96 text-white">
          <strong>שימו לב: </strong>
          המחיר המוצג מתייחס אך ורק לשליחת ההודעות ואינו כולל את עלות השימוש
          במערכת אישורי ההגעה, בעלות של 150 ₪
        </p>
      </div>
    </div>
  );
}
