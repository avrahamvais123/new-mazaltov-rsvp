"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import localforage from "localforage";
import { useState, useEffect } from "react";

const PayPal = ({ amount = "10.00", onPay }) => {
  const [finalAmount, setFinalAmount] = useState(amount);
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  useEffect(() => {
    // מתעדכן רק אם הערך של amount משתנה
    setFinalAmount(amount);
    
  }, [amount]);

  console.log("finalAmount passed to PayPal: ", finalAmount);

  return (
    <PayPalScriptProvider options={{ "client-id": clientId, currency: "ILS" }}>
      <PayPalButtons
        onCancel={(data) => onPay({})}
        createOrder={async (data, actions) => {
          const price = await localforage.getItem("event-price");
          console.log('price: ', price);

          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: price,
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            alert("Transaction completed by " + details.payer.name.given_name);
          });
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPal;
