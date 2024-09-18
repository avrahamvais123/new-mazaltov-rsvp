"use client";

import NumberInput from "@/app/ui/NumberInput";
import Table from "@/app/ui/Table";
import { cn } from "@/lib/utils";
import React, { useCallback, useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

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

const columns = (setData) => {
  const [mode, setMode] = useState(""); // שורה שנמצאת במצב עריכה
  const [editValue, setEditValue] = useState(""); // הערך החדש של התוכן הנערך

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
    {
      id: "actions",
      header: "פעולות",
      accessorKey: "actions",
    },
  ];
};

const Total = ({ status }) => {
  return (
    <div className="w-full flex-center gap-2">
      {Object.entries(status)?.map(([key, value], idx) => {
        return (
          <div
            key={idx}
            className={cn("w-32 py-4 border flex-col-center rounded-sm", {
              "bg-green-50 text-green-600 border-green-200": key === "מגיעים",
              "bg-red-50 text-red-600 border-red-200": key === "לא מגיעים",
              "bg-slate-50 text-slate-600 border-slate-200":
                key === "אולי מגיעים",
            })}
          >
            <span className="text-3xl font-bold">{value}</span>
            <span>{key}</span>
          </div>
        );
      })}
    </div>
  );
};

const GuestsTable = () => {
  const [data, setData] = useState(initialData);
  const [status, setStatus] = useState({});

  useEffect(() => {
    const result = data.reduce((acc, curr) => {
      // אם הסטטוס לא קיים במצבר, נתחיל אותו ב-0
      if (!acc[curr.status]) {
        acc[curr.status] = 0;
      }

      // אם הסטטוס הוא "לא מגיעים", נוסיף 1, אחרת נוסיף את הכמות
      if (curr.status === "לא מגיעים") {
        acc[curr.status] += 1;
      } else {
        acc[curr.status] += curr.quantity;
      }

      return acc;
    }, {});

    setStatus(result);
  }, [data]);

  const table = useReactTable({
    columns: columns(setData),
    data: data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    //initialState: { pagination: { pageSize: 50 } }, // למשל 50 שורות בעמוד
  });

  const Pagination = useCallback(() => {
    return (
      <div className="h-14 w-full py-8 border-t border-slate-200 flex-center gap-2">
        {/* מעבר לעמוד */}

        <NumberInput
          min={1}
          max={table.getPageCount()}
          onInput={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            table.setPageIndex(page);
          }}
          onIncrement={() => table?.nextPage()}
          onDecrement={() => table?.previousPage()}
        />

        <span className="flex items-center gap-1">
          <span>
            עמוד {table.getState().pagination.pageIndex + 1} מתוך{" "}
            {table.getPageCount().toLocaleString()}
          </span>
        </span>
      </div>
    );
  }, [table]);

  return (
    <div className="size-full p-4 pb-0 overflow-hidden flex-col-center gap-2">
      {/* total */}
      <Total status={status} />

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

      <Pagination />
    </div>
  );
};

export default GuestsTable;
