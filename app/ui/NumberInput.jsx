"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";

const NumberInput = ({
  onIncrement = () => {},
  onDecrement = () => {},
  onInput = () => {},
  //getValue = () => {},
  //register = () => {},
  name = "number",
  required = false,
  setValue,
  value,
  min = 1,
  max = 100,
  classNames = () => {},
  props = {},
}) => {
  //const [value, setValue] = useState(min);

  const increment = () => {
    if (value < max) {
      setValue((prevValue) => prevValue + 1);
      onIncrement();
      //getValue(value + 1);
    }
  };

  const decrement = () => {
    if (value > min) {
      setValue((prevValue) => prevValue - 1);
      onDecrement();
      //getValue(value - 1);
    }
  };

  const onChange = (e) => {
    const inputValue = e.target.value;

    // הסר תווים שאינם ספרות
    const cleanedValue = inputValue.replace(/\D/g, "");

    if (cleanedValue <= max && cleanedValue >= min) {
      // עדכן את הסטייט אם יש ערך
      console.log("cleanedValue: ", cleanedValue);
      setValue(Number(cleanedValue));
      onInput(e);
      //getValue(Number(cleanedValue));
    }
  };

  return (
    <div
      {...props?.wrapper}
      className={cn(
        "flex-center border border-slate-200 px-1 gap-1 rounded-full",
        classNames(value)?.wrapper
      )}
    >
      <button
        type="button"
        {...props?.buttonDecrement}
        onClick={decrement}
        disabled={value == min}
        className={cn(
          "size-8 text-lg ",
          "border rounded-full",
          "focus:outline-none transition-all duration-300",
          value == min
            ? "cursor-not-allowed border-slate-200 text-slate-300"
            : "border-slate-400 text-slate-400 hover:bg-slate-400 hover:text-white",
          classNames(value)?.buttonDecrement
        )}
      >
        -
      </button>
      <input
        {...props?.input}
        /* {...register(name, {
          required: required,
        })} */
        type="text"
        value={value}
        onChange={onChange}
        inputMode="numeric"
        className={cn(
          "w-14 h-10 text-center text-lg text-slate-600 outline-none",
          classNames(value)?.input
        )}
      />
      <button
        type="button"
        {...props?.increment}
        onClick={increment}
        disabled={value == max}
        className={cn(
          "size-8 text-lg text-slate-600",
          "border rounded-full",
          "focus:outline-none transition-all duration-300",
          value == max
            ? "cursor-not-allowed border-slate-200 text-slate-300"
            : "border-slate-400 text-slate-400 hover:bg-slate-400 hover:text-white",
          classNames(value)?.buttonIncrement
        )}
      >
        +
      </button>
    </div>
  );
};

export default NumberInput;
