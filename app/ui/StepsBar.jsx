"use client";

import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { Tick02Icon } from "@/app/icons/huge-icons";

const Text = ({ step }) => {
  return (
    <span
      className={cn(
        "absolute top-[115%] left-1/2",
        "-translate-x-1/2 whitespace-nowrap text-sm",
        step.status === "" ? "text-slate-300" : "text-indigo-600"
      )}
    >
      {step.name}
    </span>
  );
};

export default function NewSteps({ steps, setSteps, current }) {
  useEffect(() => {
    setSteps(
      steps.map((step) => {
        if (step.id === current) {
          return { ...step, status: "current" };
        } else if (step.id < current) {
          return { ...step, status: "complete" };
        } else {
          return { ...step, status: "" };
        }
      })
    );
  }, [current]);

  return (
    <nav>
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li key={step?.name}>
            <div
              className={cn(
                "relative text-center",
                stepIdx !== 0 && "pr-16 sm:pr-20"
              )}
            >
              {step?.status === "complete" ? (
                <>
                  <div className="absolute left-0 top-4 h-0.5 w-full bg-indigo-600" />

                  <div className="relative size-8 flex items-center justify-center rounded-full border-2 border-indigo-600 bg-indigo-600 hover:bg-indigo-900">
                    <Tick02Icon className="size-[70%] text-white" />
                    <Text step={step} />
                  </div>
                </>
              ) : step?.status === "current" ? (
                <>
                  <div className="absolute left-0 top-4 h-0.5 w-full bg-slate-200" />

                  <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white">
                    <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
                    <Text step={step} />
                  </div>
                </>
              ) : (
                <>
                  <div className="absolute left-0 top-4 h-0.5 w-full bg-slate-200" />

                  <div className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-300 bg-white hover:border-slate-400">
                    <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-slate-300" />
                    <Text step={step} />
                  </div>
                </>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
