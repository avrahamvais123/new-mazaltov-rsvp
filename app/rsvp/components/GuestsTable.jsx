"use client";

import NumberInput from "@/app/ui/NumberInput";
import Table from "@/app/ui/Table";
import { cn } from "@/lib/utils";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useRowSelection,
} from "@tanstack/react-table";
import Checkbox from "@/app/ui/Checkbox";
import TotalGuests from "./TotalGuests";
import Pagination from "./Pagination";

const initialData = [
  {
    name: "שלמה כהן",
    contact: "0548165639",
    sendingDate: "24-12-24",
    status: "אולי מגיעים",
    quantity: 2,
  },
  {
    name: "ראובן לוי",
    contact: "0548165639",
    sendingDate: "24-12-24",
    status: "לא מגיעים",
    quantity: 2,
  },
  {
    name: "שמעון ישראל",
    contact: "0548165639",
    sendingDate: "24-12-24",
    status: "מגיעים",
    quantity: 2,
  },
  {
    name: "יהודה דוד",
    contact: "0548165639",
    sendingDate: "24-12-24",
    status: "אולי מגיעים",
    quantity: 2,
  },
  {
    name: "אפרים משה",
    contact: "0548165639",
    sendingDate: "24-12-24",
    status: "מגיעים",
    quantity: 2,
  },
  {
    name: "אפרים משה",
    contact: "0548165639",
    sendingDate: "24-12-24",
    status: "מגיעים",
    quantity: 2,
  },
  {
    name: "אפרים משה",
    contact: "0548165639",
    sendingDate: "24-12-24",
    status: "מגיעים",
    quantity: 2,
  },
  {
    name: "אפרים משה",
    contact: "0548165639",
    sendingDate: "24-12-24",
    status: "מגיעים",
    quantity: 2,
  },
  {
    name: "אפרים משה",
    contact: "0548165639",
    sendingDate: "24-12-24",
    status: "מגיעים",
    quantity: 2,
  },
  {
    name: "אפרים משה",
    contact: "0548165639",
    sendingDate: "24-12-24",
    status: "מגיעים",
    quantity: 2,
  },
  {
    name: "אפרים משה",
    contact: "0548165639",
    sendingDate: "24-12-24",
    status: "מגיעים",
    quantity: 2,
  },
  {
    name: "אפרים משה",
    contact: "0548165639",
    sendingDate: "24-12-24",
    status: "מגיעים",
    quantity: 2,
  },
  {
    name: "אפרים משה",
    contact: "0548165639",
    sendingDate: "24-12-24",
    status: "מגיעים",
    quantity: 2,
  },
  {
    name: "חיים סבן",
    contact: "0548165639",
    sendingDate: "24-12-24",
    status: "מגיעים",
    quantity: 5,
  },
];

const GuestsTable = () => {
  const [data, setData] = useState(initialData);
  const [status, setStatus] = useState({
    "אולי מגיעים": 0,
    "לא מגיעים": 0,
    מגיעים: 0,
  });
  const [mode, setMode] = useState(""); // שורה שנמצאת במצב עריכה
  const [editValue, setEditValue] = useState(""); // הערך החדש של התוכן הנערך

  const columns = () => {
    const handleSave = (rowName) => {
      setData((prevData) =>
        prevData.map((row) =>
          row.name === rowName ? { ...row, name: editValue } : row
        )
      );
      setMode(""); // יציאה ממצב עריכה
    };
    return [
      {
        id: "select",
        header: ({ table }) => {
          const isSomeRowSelected = table.getIsSomeRowsSelected();
          return (
            <Checkbox
              checked={table.getIsAllRowsSelected()}
              indeterminate={isSomeRowSelected ? isSomeRowSelected : undefined}
              onChange={table.getToggleAllRowsSelectedHandler()}
            />
          );
        },
        cell: ({ row }) => {
          const isSomeSelected = row.getIsSomeSelected();
          return (
            <Checkbox
              checked={row.getIsSelected()}
              indeterminate={isSomeSelected ? isSomeSelected : undefined}
              onChange={row.getToggleSelectedHandler()}
            />
          );
        },
      },
      {
        id: "name",
        header: "שם",
        accessorKey: "name",
        cell: (props) => {
          const isEditMode = props?.row?.original?.name === mode;
          return (
            <>
              {isEditMode ? (
                <div className="flex justify-center">
                  <input
                    type="text"
                    className="text-center w-fit border border-gray-300"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    autoFocus
                  />
                  <button
                    className="ml-2 px-4 py-1 bg-green-500 text-white rounded"
                    onClick={() => handleSave(props?.row?.original?.name)}
                  >
                    שמור
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => {
                    setMode(props?.row?.original?.name);
                    setEditValue(props?.row?.original?.name); // כדי לאתחל את שדה העריכה
                  }}
                >
                  {props?.row?.original?.name}
                </div>
              )}
            </>
          );
        },
      },
      {
        id: "contact",
        header: "פרטי יצירת קשר",
        accessorKey: "contact",
      },
      {
        id: "sendingDate",
        header: "תאריך שליחה",
        accessorKey: "sendingDate",
      },
      {
        id: "status",
        header: "סטטוס הגעה",
        accessorKey: "status",
        cell: (props) => {
          return (
            <div
              className={cn("size-fit w-full px-4 py-1 rounded-full", {
                "bg-green-50 border border-green-200 text-green-600":
                  props?.row?.original?.status === "מגיעים",
                "bg-red-50 border border-red-200 text-red-600":
                  props?.row?.original?.status === "לא מגיעים",
                "bg-slate-50 border border-slate-200 text-slate-600":
                  props?.row?.original?.status === "אולי מגיעים",
              })}
            >
              {props?.row?.original?.status}
            </div>
          );
        },
      },
      {
        id: "quantity",
        header: "כמות מגיעים",
        accessorKey: "quantity",
      },
    ];
  };

  const table = useReactTable({
    columns: columns(setData),
    data: data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    //initialState: { pagination: { pageSize: 50 } }, // למשל 50 שורות בעמוד
    enableRowSelection: true,
    getRowId: (row, index) => index, // או כל מזהה ייחודי אחר
  });

  return (
    <div className="size-full p-4 py-8 pb-0 overflow-hidden flex-col-center gap-2">
      {/* total */}
      <TotalGuests status={status} data={data} setStatus={setStatus} />

      {/* title */}
      <h1 className="py-4 text-xl text-slate-400 font-medium">טבלת מוזמנים</h1>

      {/* table */}
      <Table
        table={table}
        classNames={() => ({
          wrapper: "size-full border-t overflow-auto border-slate-200",
          thead: "sticky top-0 ring-[.5px] ring-slate-200",
          th: "text-center",
          td: "text-center border-y border-gray-200",
        })}
      />

      <Pagination table={table} />
    </div>
  );
};

export default GuestsTable;
