import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import Input from "./Input";
import MySelect from "./MySelect";

const MyForm = forwardRef(
  (
    {
      children,
      formClassName,
      submitClassName,
      fieldsClassName,
      fields,
      onSubmit,
      submitName,
    },
    ref
  ) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      watch,
      setValue,
    } = useForm();

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          "w-full flex-grow max-w-96 p-4 rounded flex flex-col gap-4 relative",
          formClassName
        )}
      >
        <div
          className={cn(
            "overflow-y-auto",
            "h-72 md:h-auto pt-2",
            "grid grid-cols-12 gap-4"
          )}
        >
          {fields.map((fieldData, i) => {
            const field =
              typeof fieldData === "function"
                ? fieldData({ watch, fields })
                : fieldData;
            if (!field) return;

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
                    defaultValue={field?.defaultValue}
                    field={field}
                    value={value}
                    errors={errors}
                    setValue={setValue}
                    fieldsClassName={fieldsClassName}
                    className={fieldData?.className}
                  />
                ) : (
                  <Input
                    value={value}
                    field={field}
                    register={register}
                    errors={errors}
                    fieldsClassName={fieldsClassName}
                    className={fieldData?.className}
                  />
                )}
              </div>
            );
          })}
        </div>
        {children}

        {/* Button stays fixed */}
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
        </div>
      </form>
    );
  }
);
MyForm.displayName = "MyForm";

export default MyForm;
