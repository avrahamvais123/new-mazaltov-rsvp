"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MyForm from "@/app/ui/Form";
import MyDialog from "@/app/ui/MyDialog";
import { Add01Icon } from "@/app/icons/icons";
import { cn } from "@/lib/utils";
import axios from "axios";

const fields = [
  {
    name: "name",
    label: "שם",
    type: "text",
    required: true,
    span: 6,
  },
  {
    name: "contact",
    label: "פרטי התקשרות",
    type: "text",
    required: true,
    span: 6,
  },
  {
    name: "status",
    label: "סטטוס",
    type: "select",
    options: [
      { value: "מגיעים", label: "מגיעים" },
      { value: "לא מגיעים", label: "לא מגיעים" },
      { value: "אולי מגיעים", label: "אולי מגיעים" },
    ],
    required: true,
    span: 6,
  },
  {
    name: "quantity",
    label: "כמות",
    type: "number",
    required: true,
    span: 6,
  },
];

const AddGuest = ({}) => {
  const createGuest = async (data) => {
    try {
      const res = await axios.post("/api/guests", {
        ...data,
      });
      console.log("res: ", res);
    } catch (error) {
      console.error(
        "Error creating guest: ",
        error.response?.data || error.message
      );
    }
  };

  const onSubmit = (data, setOpen) => {
    console.log("setOpen: ", setOpen);
    console.log("data: ", data);
    createGuest(data);
    setOpen(false);
  };

  return (
    <MyDialog
      customTrigger={({ open, setOpen }) => (
        <button
          onClick={() => setOpen(true)}
          className={cn(
            "bg-indigo-600 text-white",
            "p-2 rounded-sm flex-center gap-2"
          )}
        >
          <Add01Icon className="size-4 text-white" />
        </button>
      )}
      content={({ setOpen }) => (
        <MyForm
          onSubmit={(data) => onSubmit(data, setOpen)}
          fields={fields}
          customSubmit={
            <button
              type="submit"
              className={cn(
                "w-fit self-end px-4 py-2",
                "bg-indigo-600 text-white",
                "rounded-sm flex-center gap-2"
              )}
            >
              אישור
            </button>
          }
        />
      )}
      noFooter
    />
  );
};

export default AddGuest;
