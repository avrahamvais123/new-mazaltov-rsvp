"use client";

import { useState } from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import { cn } from "@/lib/utils";

const radios = [
  {
    name: "עד 100 מוזמנים",
    description: "תוספת 50 ש׳׳ח",
  },
  {
    name: "עד 200 מוזמנים",
    description: "תוספת 100 ש׳׳ח",
  },
  {
    name: "עד 300 מוזמנים",
    description: "תוספת 150 ש׳׳ח",
  },
];

export default function MyRadioGroup() {
  const [selected, setSelected] = useState(radios[0]);

  return (
    <fieldset className="w-full overflow-hidden max-w-xl relative">
      <RadioGroup
        value={selected}
        onChange={setSelected}
        className="space-y-2 overflow-y-auto max-h-96 bg-white"
      >
        {radios.map((radio, idx) => (
          <Radio
            key={radio?.name}
            value={radio}
            className={cn(
              "group relative p-4",
              "cursor-pointer rounded-sm",
              "flex-col-center items-start gap-1",
              "md:flex-row md:justify-between md:pl-4 md:pr-6 md:gap-4",
              "border border-gray-200",
              "data-[checked]:border-indigo-200",
              "data-[checked]:bg-indigo-50",
              "data-[checked]:z-10",
              "focus:outline-none"
            )}
          >
            {/* name */}
            <span className="flex gap-2 items-center text-sm">
              <span
                className={cn(
                  "size-4 bg-white",
                  "flex-center rounded-full",
                  "border border-gray-300",
                  "group-data-[checked]:border-transparent",
                  "group-data-[checked]:bg-indigo-600",
                  "group-data-[focus]:ring-2",
                  "group-data-[focus]:ring-indigo-600",
                  "group-data-[focus]:ring-offset-2"
                )}
              >
                <span className="size-1.5 rounded-full bg-white" />
              </span>

              <span className="font-medium text-gray-900 group-data-[checked]:text-indigo-900">
                {radio?.name}
              </span>
            </span>

            {/* description */}
            <span className="text-sm text-gray-500 group-data-[checked]:text-indigo-700">
              {radio?.description}
            </span>
          </Radio>
        ))}
      </RadioGroup>
    </fieldset>
  );
}
