"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";

const NumberInput = ({
  onIncrement = () => {},
  onDecrement = () => {},
  onInput = () => {},
  min = 1,
  max = 100,
}) => {
  const [value, setValue] = useState(min);
  console.log("value: ", value);
  console.log("min: ", min);
  console.log("max: ", max);

  const increment = () => {
    if (value < max) {
      setValue((prevValue) => prevValue + 1);
      onIncrement();
    }
  };

  const decrement = () => {
    if (value > min) {
      setValue((prevValue) => prevValue - 1);
      onDecrement();
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
    }
  };

  return (
    <div className="flex-center border border-slate-200 px-1 gap-1 rounded-full">
      <button
        onClick={decrement}
        disabled={value == min}
        className={cn(
          "size-8 text-lg ",
          "border rounded-full",
          "focus:outline-none transition-all duration-300",
          value == min
            ? "cursor-not-allowed border-slate-200 text-slate-300"
            : "border-indigo-600 hover:text-white hover:bg-indigo-600"
        )}
      >
        -
      </button>
      <input
        type="text"
        value={value}
        onChange={onChange}
        inputMode="numeric"
        className={cn(
          "w-14 h-10 text-center text-lg text-slate-600 outline-none"
        )}
      />
      <button
        onClick={increment}
        disabled={value == max}
        className={cn(
          "size-8 text-lg text-slate-600",
          "border rounded-full",
          "focus:outline-none transition-all duration-300",
          value == max
            ? "cursor-not-allowed border-slate-200 text-slate-300"
            : "border-indigo-600 hover:text-white hover:bg-indigo-600"
        )}
      >
        +
      </button>
    </div>
  );
};

export default NumberInput;
