"use client";

import { Delete02Icon } from "@/app/icons/icons";
import { cn } from "@/lib/utils";
import React from "react";
import AddGuest from "./AddGuest";
import RemoveGuests from "./RemoveGuests";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import SendSMS from "./SendSMS";
import { useSession } from "next-auth/react";

const TableHeader = ({ table, setData, refetch, removeGuests }) => {
  const { data: session } = useSession();

  /* send whatsapp */
  const sendWhatsapp = useMutation({
    mutationFn: async () => {
      const res = await axios.post("/api/whatsapp", {
        to: "534272182",
        body: "בתי ראית אני יכול לשלוח גם ווצאפ מהאפליקציה שלי!!! אליפות!!!",
      });

      console.log("res: ", res);
    },
  });

  return (
    <div className="w-full mb-3 mt-10 flex-center justify-between gap-2">
      {/* title */}
      <h1 className="text-xl text-slate-400 font-medium">טבלת מוזמנים</h1>

      {/* buttons */}
      <div className="flex-center gap-2">
        {/* send sms */}
        {/* <SendSMS table={table} data={data} /> */}

        {/* add */}
        <AddGuest refetch={refetch} />

        {/* remove */}
        <RemoveGuests
          remove={() => {
            const guestsToRemove = table
              ?.getSelectedRowModel()
              .rows.map((row) => row?.id);

            removeGuests.mutate(guestsToRemove);
          }}
          CustomTrigger={({ setOpen }) => {
            const isSomeRowsSelected = table?.getIsSomeRowsSelected();
            return (
              <button
                onClick={() =>
                  session && isSomeRowsSelected ? setOpen(true) : null
                }
                className={cn(
                  "bg-indigo-600 text-white",
                  "p-2.5 rounded-sm flex-center gap-2"
                )}
              >
                <Delete02Icon className="size-5 text-white" />
              </button>
            );
          }}
        />
      </div>
    </div>
  );
};

export default TableHeader;
