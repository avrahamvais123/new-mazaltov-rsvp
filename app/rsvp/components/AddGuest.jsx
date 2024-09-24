"use client";

import React, { useEffect } from "react";
import MyForm from "@/app/ui/MyForm";
import MyDialog from "@/app/ui/MyDialog";
import { Add01Icon } from "@/app/icons/icons";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

const fields = (watch) => [
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
    appear: watch("status") === "לא מגיעים" ? false : true,
  },
];

const AddGuest = ({ setData }) => {
  const form = useForm();
  const { data: session } = useSession();

  useEffect(() => {
    const status = form?.watch("status");
    if (status === "לא מגיעים") {
      form?.setValue("quantity", 0);
    }
  }, [form?.watch("status"), form?.setValue]);

  const createGuest = async (data) => {
    data.belongsTo = session?.user?.email;
    try {
      const res = await axios.post("/api/guests", {
        ...data,
      });
      console.log("res: ", res);
      setData((prev) => [...prev, res?.data?.data]);
    } catch (error) {
      console.error(
        "Error creating guest: ",
        error.response?.data || error.message
      );
    }
  };

  const onSubmit = (data, setOpen) => {
    console.log("data: ", data);
    createGuest(data);
    setOpen(false);
    form?.reset();
  };

  const CustomTrigger = ({ setOpen }) => (
    <button
      onClick={() => setOpen(true)}
      className={cn(
        "bg-indigo-600 text-white",
        "p-2.5 rounded-sm flex-center gap-2"
      )}
    >
      <Add01Icon className="size-5 text-white" />
    </button>
  );

  const content = ({ setOpen }) => (
    <MyForm
      onSubmit={(data) => onSubmit(data, setOpen)}
      fields={fields(form?.watch)}
      form={form}
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
  );

  return (
    <MyDialog
      noFooter
      title="הוספת מוזמן"
      description="מלא פרטים על המוזמן"
      customTrigger={CustomTrigger}
      content={content}
    />
  );
};

export default AddGuest;
