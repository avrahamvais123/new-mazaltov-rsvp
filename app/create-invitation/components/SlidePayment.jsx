"use client";

import React, { useState } from "react";
import PayPal from "./Paypal";
import { cn } from "@/lib/utils";

const SlidePayment = () => {
  const [paymentSource, setPaymentSource] = useState(null);
  console.log("paymentSource: ", paymentSource);

  const onPay = ({ data, actions }) => {
    console.log("actions: ", actions);
    console.log("data: ", data);
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
        <PayPal onPay={onPay} amount="50.00" />
      </div>
    </div>
  );
};

export default SlidePayment;
