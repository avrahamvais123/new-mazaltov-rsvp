"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPal = ({ amount, onPay }) => {
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
                  value: amount || "100.00", // סכום התשלום
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
