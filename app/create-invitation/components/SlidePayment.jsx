"use client";

import React, { useState } from "react";
import PayPal from "./Paypal";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { eventAtom } from "@/lib/jotai";

const SlidePayment = () => {
  const [paymentSource, setPaymentSource] = useState(null);
  const [event, setEvent] = useAtom(eventAtom);

  console.log("event: ", event);

  const onPay = ({ data, actions }) => {
    setPaymentSource(data?.paymentSource);
  };

  return (
    <div
      className={cn(
        "h-full w-full max-w-96 mt-20",
        "flex flex-col transition-all duration-500"
      )}
    >
      <h1 className="font-medium text-xl">תשלום</h1>
      <p className="text-xs">כאן תוכל לבחור את אמצעי התשלום שלך</p>
      <div className="mt-6 flex-grow overflow-auto">
        <PayPal onPay={onPay} amount={event?.price} />
      </div>
    </div>
  );
};

export default SlidePayment;
