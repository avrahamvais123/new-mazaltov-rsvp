"use client";

import { ColorPickerIcon } from "@/app/icons/icons";
import { cn } from "@/lib/utils";
import React, { useState, useCallback } from "react";
import useEyeDropper from "use-eye-dropper";

const EyeDropper = ({ className, color, setColor, ...props }) => {
  const { open, close, isSupported } = useEyeDropper();
  const [error, setError] = useState();
  // useEyeDropper will reject/cleanup the open() promise on unmount,
  // so setState never fires when the component is unmounted.
  const pickColor = useCallback(() => {
    // Using async/await (can be used as a promise as-well)
    const openPicker = async () => {
      try {
        const color = await open();
        setColor(color.sRGBHex);
      } catch (e) {
        console.log(e);
        // Ensures component is still mounted
        // before calling setState
        if (!e.canceled) setError(e);
      }
    };
    openPicker();
  }, [open]);

  return (
    <>
      {isSupported() ? (
        <ColorPickerIcon
          {...props}
          className={cn("cursor-pointer size-full max-w-6 text-slate-400", className)}
          onClick={pickColor}
        />
      ) : (
        <span>EyeDropper API not supported in this browser</span>
      )}
      {/* {!!error && <div>{error.message}</div>} */}
    </>
  );
};

export default EyeDropper;
