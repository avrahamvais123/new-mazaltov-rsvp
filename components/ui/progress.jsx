"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef(({ classNames, value, ...props }, ref) => {
  console.log('classNames: ', classNames);
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
        classNames?.root
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "size-full flex-1 bg-primary transition-all",
          classNames?.indicator
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
