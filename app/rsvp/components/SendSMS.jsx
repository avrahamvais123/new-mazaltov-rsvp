"use client";

import React, { useEffect } from "react";
import MyDialog from "@/app/ui/MyDialog";
import { Message01Icon } from "@/app/icons/icons";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const SendSMS = ({ table, data }) => {
  console.log("table: ", table);
  console.log("data: ", data);

  const sendSms = useMutation({
    mutationFn: async ({ recipient }) => {
      console.log("recipient from sendSMS: ", recipient);

      try {
        const res = await axios.post("/api/sms", {
          msg: `מזל טוב!!! הוזמנתם לבר המצווה של רפאל זוהר אפשר לראות ההזמנה ולאשר הגעה בקישור הבא: https://new-mazaltov-rsvp-73rs.vercel.app/`,
          recipient,
        });

        console.log("res: ", res);
      } catch (error) {
        console.error("error: ", error);
      }
    },
  });

  function getContactsByStatus(arr, status) {
    // סינון המערך לפי השדה "status"
    const filtered = arr.filter((item) => item.status === status);

    // מיפוי של שדה "contact" והצטרפות המחרוזות עם ";"
    const contactsString = filtered.map((item) => item.contact).join(";");

    return { recipient: contactsString, length: filtered.length };
  }

  const CustomTrigger = ({ setOpen }) => (
    <button
      onClick={() => setOpen(true)}
      className={cn(
        "bg-indigo-600 text-white",
        "p-2.5 rounded-sm flex-center gap-2"
      )}
    >
      <Message01Icon className="size-5 text-white" />
    </button>
  );

  const content = ({ setOpen }) => {
    const { recipient, length } = getContactsByStatus(data, "אולי מגיעים");
    console.log('length: ', length);
    console.log("recipient: ", recipient);

    //sendSms.mutate({ recipient });
    //setOpen(false);

    return <div className="">khjjh</div>;
  };

  return (
    <MyDialog
      noFooter
      Icon={() => <Message01Icon className="w-14 h-fit ml-4 text-indigo-600" />}
      title="שליחת הודעת SMS"
      description="יש למלא את המספרי הטלפון של המוזמנים שאליהם ישלח קישור להזמנה בהודעת סמס מופרדים ברווח"
      customTrigger={CustomTrigger}
      content={content}
    />
  );
};

export default SendSMS;
