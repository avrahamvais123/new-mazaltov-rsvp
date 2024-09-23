import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Controller, useController, useForm } from "react-hook-form";
import Input from "./Input";
import MySelect from "./MySelect";
import MyRadioGroup from "./MyRadioGroup";

const MyForm = forwardRef(
  (
    {
      children,
      classNames = {},
      fieldsClassName,
      fields = [],
      onSubmit,
      customSubmit,
      success,
      error,
      form,
    },
    ref
  ) => {
    console.log("customSubmit: ", customSubmit);

    const {
      handleSubmit,
      register,
      setValue,
      watch,
      formState: { errors },
    } = form;
    console.log("form: ", form);

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          "relative w-full h-fit max-w-96",
          "flex flex-col gap-4 rounded",
          classNames?.form
        )}
      >
        <div
          className={cn(
            "overflow-y-auto pt-1",
            "md:h-auto w-full",
            "grid grid-cols-12 gap-4"
          )}
        >
          {/* alerts */}
          {success && (
            <span className="col-span-12 py-2 text-xs text-center bg-lime-50 text-lime-500">
              {success}
            </span>
          )}
          {error && (
            <span className="col-span-12 py-2 text-xs text-center bg-red-50 text-red-500">
              {error}
            </span>
          )}

          {fields.map((field, i) => {
            if (!field || field?.appear === false) return;

            const value = watch(field?.name);

            return (
              <div
                key={i}
                style={{
                  gridColumn: `span ${field?.span || 12} / span 12`,
                }}
                className="relative max-md:col-span-12"
              >
                {field?.type === "select" ? (
                  <MySelect
                    defaultValue={form?.watch(field?.name)}
                    field={field}
                    value={value}
                    errors={errors}
                    setValue={setValue}
                    fieldsClassName={classNames?.fields}
                    className={field?.className}
                  />
                ) : field?.type === "radioGroup" ? (
                  <MyRadioGroup
                    title={field?.title}
                    name={field?.name}
                    register={register}
                    watch={watch}
                    options={field?.options}
                    classNames={field?.classNames}
                  />
                ) : (
                  <Input
                    value={value}
                    field={field}
                    register={register}
                    errors={errors}
                    fieldsClassName={classNames?.fields}
                    className={field?.className}
                  />
                )}
              </div>
            );
          })}
        </div>
        {children}
        {customSubmit}
      </form>
    );
  }
);
MyForm.displayName = "MyForm";

export default MyForm;

/* Button stays fixed
<div className="w-full sticky bottom-0 bg-white py-2">
<button
  type="submit"
  className={cn(
    "w-full px-4 py-2",
    "bg-indigo-800 text-indigo-50",
    submitClassName
  )}
>
  {submitName}
</button>
</div> */
