"use client";

import { invitation_details_Atom } from "@/lib/jotai";
import { useAtom } from "jotai";
import React from "react";
import MyForm from "@/app/ui/MyForm";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";

const BTN_CLASSNAMES = {
  previous: cn(
    "w-full px-4 py-2 rounded-md",
    "border border-indigo-600",
    "hover:border-indigo-700 active:border-indigo-800",
    "hover:text-white active:text-white",
    "bg-white text-indigo-600 transition-all",
    "hover:bg-indigo-700 active:bg-indigo-800"
  ),
  next: cn(
    "w-full px-4 py-2 rounded-md",
    "border border-indigo-600",
    "bg-indigo-600 text-white transition-all",
    "hover:bg-indigo-700 active:bg-indigo-800"
  ),
};

const fields = (watch) => [
  {
    name: "eventType",
    label: "סוג אירוע",
    type: "select",
    span: 6,
    required: true,
    options: [
      { label: "חתונה", value: "חתונה" },
      { label: "בר מצווה", value: "בר מצווה" },
      { label: "בת מצווה", value: "בת מצווה" },
      { label: "ברית", value: "ברית" },
      { label: "בריתה", value: "בריתה" },
    ],
  },
  {
    name: "title",
    label: "שם האירוע",
    span: 6,
    required: true,
    helper: "שם האירוע שיופיע בראש ההזמנה הדיגיטלית, לדוגמה: הזמנה לחתונה של יוסי ומירי",
  },
  {
    name: "date",
    label: "תאריך האירוע",
    type: "date",
    span: 6,
    required: true,
  },
  ["חתונה", "בר מצווה"].includes(watch("eventType")) && {
    name: "groom_name",
    label: "שם החתן",
    type: "text",
    span: 6,
    required: true,
  },
  ["חתונה", "בת מצווה"].includes(watch("eventType")) && {
    name: "bride_name",
    label: "שם הכלה",
    type: "text",
    span: 6,
    required: true,
  },
  ["חתונה", "בר מצווה"].includes(watch("eventType")) && {
    name: "groom_parents",
    label: "הורי החתן",
    type: "text",
    span: 6,
    required: true,
  },
  ["חתונה", "בת מצווה"].includes(watch("eventType")) && {
    name: "bride_parents",
    label: "הורי הכלה",
    type: "text",
    span: 6,
    required: true,
  },
  ["בריתה", "בריתה"].includes(watch("eventType")) && {
    name: "parents",
    label: "שמות ההורים",
    type: "text",
    span: 6,
    required: true,
  },
  {
    name: "reception_time",
    label: "שעת קבלת פנים",
    type: "time",
    span: 6,
    required: true,
  },
  watch("eventType") === "חתונה" && {
    name: "hupa_time",
    label: "שעת החופה",
    type: "time",
    span: 6,
    required: true,
  },
  {
    name: "place",
    label: "מיקום האירוע",
    type: "text",
    span: 6,
    required: true,
  },
  {
    name: "address",
    label: "כתובת האולם",
    type: "text",
    span: 6,
    required: true,
  },
  {
    name: "googleMapsLink",
    label: "קישור למפות גוגל",
    type: "text",
    span: 6,
    required: true,
  },
  {
    name: "wazeLink",
    label: "קישור לוויז",
    type: "text",
    span: 6,
    required: true,
  },
];

const SlideDetails = ({ carouselApi }) => {
  //console.log("carouselApi: ", carouselApi);
  const form = useForm();

  const [invitationDetails, setInvitationDetails] = useAtom(
    invitation_details_Atom
  );

  const nextStep = () => {
    if (!carouselApi) return;
    const details = form.getValues();
    console.log("details: ", details);
    setInvitationDetails((prev) => ({ ...prev, ...details }));
    carouselApi?.scrollNext();
  };
  const previousStep = () => {
    if (!carouselApi) return;
    carouselApi?.scrollPrev();
  };

  return (
    <div className="size-full flex-center max-md:flex-col max-md:justify-start md:items-start overflow-auto">
      <MyForm
        formClassName="size-full justify-start"
        form={form}
        fields={fields(form?.watch)}
        noSubmit
      >
        <div className="flex-center gap-2">
          <button onClick={previousStep} className={BTN_CLASSNAMES.previous}>
            חזור
          </button>
          <button onClick={nextStep} className={BTN_CLASSNAMES.next}>
            הבא
          </button>
        </div>
      </MyForm>
    </div>
  );
};

export default SlideDetails;

{
  /* <button onClick={() => takeScreenshot("screenshot")}>click</button>
      <div id="screenshot" className="relative size-96">
        <DraggableTextBox className="" text={invitation_details.text_1} />
        <img src="/images/הזמנה לבר מצווה 2 ב.jpg" className="cover" />
      </div> */
}
