"use client";

import Form from "@/app/ui/Form";
import React from "react";

const StepOne = ({ carouselApi }) => {
  const fields = [
    {
      name: "eventType",
      label: "סוג אירוע",
      type: "select",
      placeholder: "סוג אירוע",
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
      name: "date",
      label: "תאריך האירוע",
      type: "date",
      placeholder: "תאריך האירוע",
      span: 6,
      required: true,
    },
    ({ watch }) =>
      (watch("eventType") === "חתונה" || watch("eventType") === "בר מצווה") && {
        name: "groom_name",
        label: "שם החתן",
        type: "text",
        placeholder: "שם החתן",
        span: 6,
        required: true,
      },
    ({ watch }) =>
      (watch("eventType") === "חתונה" || watch("eventType") === "בת מצווה") && {
        name: "bride_name",
        label: "שם הכלה",
        type: "text",
        placeholder: "שם הכלה",
        span: 6,
        required: true,
      },
    ({ watch }) =>
      watch("eventType") === "חתונה" && {
        name: "groom_parents",
        label: "הורי החתן",
        type: "text",
        placeholder: "הורי החתן",
        span: 6,
        required: true,
      },
    ({ watch }) =>
      watch("eventType") === "חתונה" && {
        name: "bride_parents",
        label: "הורי הכלה",
        type: "text",
        placeholder: "הורי הכלה",
        span: 6,
        required: true,
      },
    ({ watch }) =>
      watch("eventType") !== "חתונה" && {
        name: "bride_parents",
        label: "שמות ההורים",
        type: "text",
        placeholder: "שמות ההורים",
        span: 6,
        required: true,
      },
    ({ watch }) => ({
      name: "reception_time",
      label: "שעת קבלת פנים",
      type: "time",
      placeholder: "שעת קבלת פנים",
      span: 6,
      required: true,
    }),
    ({ watch }) =>
      watch("eventType") === "חתונה" && {
        name: "hupa_time",
        label: "שעת החופה",
        type: "time",
        placeholder: "שעת החופה",
        span: 6,
        required: true,
      },
    {
      name: "place",
      label: "מיקום האירוע",
      type: "text",
      placeholder: "מיקום האירוע",
      span: 6,
      required: true,
    },
    {
      name: "address",
      label: "כתובת האולם",
      type: "text",
      placeholder: "כתובת האולם",
      span: 6,
      required: true,
    },
  ];

  const onSubmit = (data) => {
    console.log("data: ", data);
    carouselApi?.scrollNext();
  };

  return (
    <Form
      formClassName="size-full justify-start"
      fields={fields}
      onSubmit={onSubmit}
      submitName="עבור"
    />
  );
};

export default StepOne;
