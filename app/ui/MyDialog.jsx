"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const MyDialog = ({
  customTrigger = () => {},
  content = () => {},
  customSubmit = () => {},
  noFooter = false,
  open,
  setOpen,
}) => {
  const [openDialog, setOpenDialog] = useState(false);

  const currentOpen = open ? open : openDialog;
  const currentSetOpen = setOpen ? setOpen : setOpenDialog;

  return (
    <Dialog open={currentOpen}>
      <DialogTrigger asChild>
        {customTrigger ? (
          customTrigger({ open: currentOpen, setOpen: currentSetOpen })
        ) : (
          <button variant="outline">פתיחת המודאל</button>
        )}
      </DialogTrigger>
      <DialogContent
        closeProps={{
          onClick: () => currentSetOpen(false),
        }}
        overlayProps={{
          onClick: () => currentSetOpen(false),
        }}
        className="sm:max-w-[425px]"
      >
        <DialogHeader className="">
          <DialogTitle>הוספת מוזמן</DialogTitle>
          <DialogDescription>
            בחר את מאפייני המוזמן החדש ואשר.
          </DialogDescription>
        </DialogHeader>

        {content({ open: currentOpen, setOpen: currentSetOpen })}

        {!noFooter && (
          <DialogFooter>
            {customSubmit() ? (
              customSubmit({ open: currentOpen, setOpen: currentSetOpen })
            ) : (
              <button onClick={() => currentSetOpen(false)} type="submit">
                אישור
              </button>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MyDialog;