import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import Input from "./Input";
import MySelect from "./MySelect";

const MyForm = forwardRef(
  ({ children, formClassName, inputs, onSubmit, submitName }, ref) => {
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
          "w-full h-fit max-w-96 p-4 rounded flex flex-col gap-4 relative",
          formClassName
        )}
      >
        <div className="h-72 md:h-auto grid grid-cols-12 gap-4 overflow-y-auto">
          {/* הוספתי md:h-auto */}
          {inputs.map((input, i) => {
            const value = watch(input?.name);

            return (
              <div
                key={i}
                className={cn(
                  `col-span-${input?.span || 12}`,
                  `relative max-md:col-span-12`
                )}
              >
                {input?.type === "select" ? (
                  <MySelect
                    input={input}
                    value={value}
                    errors={errors}
                    setValue={setValue}
                  />
                ) : (
                  <Input
                    value={value}
                    input={input}
                    register={register}
                    errors={errors}
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
            className="w-full bg-indigo-800 text-indigo-50 px-4 py-2"
          >
            {submitName}
          </button>
        </div>
      </form>
    );
  }
);

export default MyForm;
