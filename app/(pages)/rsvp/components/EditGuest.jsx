"use client";

import React, { useEffect } from "react";
import MyForm from "@/app/ui/MyForm";
import MyDialog from "@/app/ui/MyDialog";
import { Edit02Icon } from "@/app/icons/icons";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";

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
    //required: true,
    span: 6,
  },
  {
    name: "status",
    label: "סטטוס",
    type: "select",
    required: true,
    span: 6,
    options: [
      { value: "מגיעים", label: "מגיעים" },
      { value: "לא מגיעים", label: "לא מגיעים" },
      { value: "אולי מגיעים", label: "אולי מגיעים" },
    ],
  },
  {
    name: "quantity",
    label: "כמות",
    type: "number",
    //required: true,
    span: 6,
    appear: watch("status") === "לא מגיעים" ? false : true,
  },
];

const EditGuest = ({ editGuest, row }) => {
  const form = useForm({
    defaultValues: { ...row?.original },
  });

  useEffect(() => {
    const status = form?.watch("status");
    if (status === "לא מגיעים") {
      form?.setValue("quantity", 0);
    }
  }, [form?.watch("status"), form?.setValue]);

  const onSubmit = (data, setOpen) => {
    console.log("data: ", data);
    editGuest.mutate(data);
    setOpen(false);
    form?.reset();
  };

  const CustomTrigger = ({ setOpen }) => (
    <button onClick={() => setOpen(true)}>
      <Edit02Icon
        className={cn(
          "size-5 text-slate-600 transition-all",
          "hover:text-blue-600 active:text-blue-700"
        )}
      />
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
      title="עדכון מוזמן"
      description="עדכון פרטים על המוזמן"
      customTrigger={CustomTrigger}
      content={content}
    />
  );
};

export default EditGuest;
