"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPal = ({ amount = "10.00", onPay }) => {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  return (
    <PayPalScriptProvider options={{ "client-id": clientId }}>
      <PayPalButtons
        onCancel={(data) => onPay({})}
        createOrder={(data, actions) => {
          onPay({ data, actions });

          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: "ILS", // הגדרת המטבע לשקלים
                  value: amount, // סכום התשלום מועבר מהפרופס או דיפולט של 50.00
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            alert("Transaction completed by " + details.payer.name.given_name);
            // כאן תוכל לשלוח את פרטי התשלום לשרת שלך
          });
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPal;
