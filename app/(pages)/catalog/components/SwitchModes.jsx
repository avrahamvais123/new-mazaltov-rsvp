"use client";

import { Switch } from "@/components/ui/switch";
import { catalog_editingMode_Atom } from "@/lib/jotai";
import { useAtom } from "jotai";
import React from "react";

const SwitchModes = () => {
  const [editingMode, setEditingMode] = useAtom(catalog_editingMode_Atom);
  console.log("editingMode: ", editingMode);

  const handleEditingMode = () => {
    setEditingMode(!editingMode);
  };

  return (
    <div className="z-20 absolute top-5 right-5 flex-center gap-2">

      <button className="btn btn-primary">click</button>
      <Switch
        id="editing-mode"
        classNames={{
          root: "data-[state=unchecked]:bg-indigo-100 data-[state=checked]:bg-indigo-900",
          thumb: "data-[state=checked]:bg-indigo-400 bg-indigo-500",
        }}
        checked={editingMode}
        onCheckedChange={handleEditingMode}
      />
      <label className="text-white" htmlFor="editing-mode">
        מצב עריכה
      </label>
      <button className="btn btn-primary">מצב עריכה</button>
    </div>
  );
};

export default SwitchModes;
