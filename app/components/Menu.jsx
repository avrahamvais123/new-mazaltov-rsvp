"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";

const Menu = ({ open, setOpen }) => {
  return (
    <Sheet open={open}>
      <SheetContent setOpen={setOpen} className="bg-indigo-800">
        <SheetHeader>
          <SheetTitle className="text-white">תפריט</SheetTitle>
          <SheetDescription className="hidden" />
          <div className="text-right flex flex-col text-indigo-400">
            <Link href="/">אודות</Link>
            <Link href="/">צור קשר</Link>
            <Link href="/">מדיניות פרטיות</Link>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Menu;
