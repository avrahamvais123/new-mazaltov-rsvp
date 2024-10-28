"use client";

import Loader from "@/app/ui/Loader";
import NumberInput from "@/app/ui/NumberInput";
import { errorToast, successToast } from "@/app/ui/toasts";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

const fields = [
  {
    name: "name",
    label: "שם",
    type: "text",
    required: true,
  },
  {
    type: "radioGroup",
    name: "status",
    options: [
      {
        text: "מגיעים",
        value: "מגיעים",
      },
      {
        text: "אולי מגיעים",
        value: "אולי מגיעים",
      },
      {
        text: "לא מגיעים",
        value: "לא מגיעים",
      },
    ],
    classNames: {
      wrapper: "",
    },
  },
  {
    name: "name",
    label: "שם",
    type: "textarea",
    required: true,
  },
];

const InvitaionForm = ({ email, client }) => {
  const [quantity, setQuantity] = useState(1);
  console.log("quantity: ", quantity);
  const { reset, register, handleSubmit, watch } = useForm({
    defaultValues: {
      status: "מגיעים",
    },
  });

  const options = [
    {
      id: 1,
      value: "מגיעים",
      className: ({ isActive }) =>
        cn(
          isActive
            ? "border-green-600 bg-green-600 text-white"
            : "border-green-600 text-green-600"
        ),
    },
    {
      id: 2,
      value: "אולי מגיעים",
      className: ({ isActive }) =>
        cn(
          isActive
            ? "border-slate-400 bg-slate-400 text-slate-600"
            : "border-slate-400 text-slate-800"
        ),
    },
    {
      id: 3,
      value: "לא מגיעים",
      className: ({ isActive }) =>
        cn(
          isActive
            ? "border-red-600 bg-red-600 text-white"
            : "border-red-600 text-red-600"
        ),
    },
  ];

  const sendRSVPMutation = useMutation({
    mutationFn: async (data) => {
      try {
        const res = await axios.post("/api/invitation", {
          ...data,
        });
        console.log("res: ", res);
      } catch (error) {
        console.error("error: ", error);
        throw Error("error: ", error);
      }
    },
    onSuccess: () => {
      successToast({ text: "הפרטים שנלחו בהצלחה" });
      reset();
    },
    onError: (error) => {
      console.error("error: ", error);
      errorToast({ text: "אירעה שגיאה, הודעה לא נשלחה" });
    },
  });

  const onSubmit = (data) => {
    data.belongsTo = email;
    data.client = client;
    if (watch("status") !== "לא מגיעים") {
      data.quantity = quantity.toString();
    }
    console.log("data: ", data);
    sendRSVPMutation.mutateAsync(data);
  };

  return (
    <fieldset className="w-full max-w-[500px] p-4 flex-col-center gap-4  border rounded-md">
      <legend className="px-4 text-lg font-bold text-slate-400">
        אישורי הגעה
      </legend>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative size-full flex-col-center gap-4"
      >
        <Loader
          text="שולח את ההודעה..."
          isLoading={sendRSVPMutation.isPending}
        />

        {/* שם */}
        <label className="w-full flex-col-center items-start text-slate-400">
          שם
          <input
            className="w-full px-4 py-2 border rounded-md ring-1 ring-transparent transition-all focus:ring-indigo-800 outline-0"
            {...register("name", { required: true })}
          />
        </label>

        {/* אישור הגעה */}
        <label className="w-full flex-col-center items-start text-slate-400">
          אישור הגעה
          <div className="w-full flex-col-center md:flex-row gap-2">
            {options.map((option) => {
              const isActive = watch("status") == option.value;
              return (
                <label key={option.value} className="w-full cursor-pointer">
                  <input
                    type="radio"
                    value={option.value}
                    {...register("status", { required: true })}
                    className="hidden"
                  />
                  <div
                    className={cn(
                      "w-full px-4 py-2 text-center rounded-md border transition-all",
                      isActive
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                      /* option.className({ isActive }) */
                    )}
                  >
                    {option.value}
                  </div>
                </label>
              );
            })}
          </div>
        </label>

        {/* כמות מגיעים */}
        {watch("status") !== "לא מגיעים" && (
          <div className="w-full flex-col-center text-slate-400">
            כמות מגיעים
            <NumberInput
              name="quantity"
              required
              value={quantity}
              setValue={setQuantity}
              classNames={{
                buttonDecrement:
                  quantity != 1 &&
                  "hover:bg-indigo-600 hover:text-white hover:border-indigo-600",
                buttonIncrement:
                  quantity != 1 &&
                  "hover:bg-indigo-600 hover:text-white hover:border-indigo-600",
              }}
            />
          </div>
        )}

        {/* ברכות ואיחולים */}
        <label className="w-full flex-col-center items-start text-slate-400">
          ברכות ואיחולים
          <textarea
            rows="4"
            {...register("congratulations")}
            className="resize-none py-1 px-3 border w-full rounded-md ring-1 ring-transparent transition-all focus:ring-indigo-800 outline-0"
          ></textarea>
        </label>

        <button className="bg-indigo-600 text-white py-2 px-4 rounded-md w-full">
          שלח
        </button>
      </form>
    </fieldset>
  );
};

export default InvitaionForm;
