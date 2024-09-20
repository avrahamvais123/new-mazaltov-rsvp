"use client";

import Table from "@/app/ui/Table";
import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import TotalGuests from "./TotalGuests";
import Pagination from "./Pagination";
import { columns } from "./columns";
import TableHeader from "./TableHeader";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

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
  const [data, setData] = useState([]);
  const [editValue, setEditValue] = useState("");
  const [mode, setMode] = useState(""); // שורה שנמצאת במצב עריכה
  const [status, setStatus] = useState({
    "אולי מגיעים": 0,
    "לא מגיעים": 0,
    מגיעים: 0,
  });

  const getData = useMutation({
    mutationFn: async () => {
      try {
        const res = await axios.get("/api/guests");
        console.log("res: ", res);

        return res?.data?.data || [];
      } catch (error) {
        console.error(
          "Error getting all guests: ",
          error.response?.data || error.message
        );
      }
    },
    onSuccess: async (data) => {
      console.log("data: ", data);
      setData(data);
    },
  });

  useEffect(() => {
    getData.mutate();
  }, []);

  const table = useReactTable({
    columns: columns({ setData, mode, setMode, editValue, setEditValue }),
    data: data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    //initialState: { pagination: { pageSize: 50 } }, // למשל 50 שורות בעמוד
    enableRowSelection: true,
    getRowId: (row, index) => index, // או כל מזהה ייחודי אחר
  });

  return (
    <div className="size-full p-4 py-8 pb-0 overflow-hidden flex-col-center">
      {/* total */}
      <TotalGuests status={status} data={data} setStatus={setStatus} />

      {/* table header */}
      <TableHeader />

      {/* table */}
      <Table
        table={table}
        classNames={() => ({
          wrapper: "size-full border-t overflow-auto border-slate-200",
          thead: "sticky top-0 z-10 ring-[.5px] ring-slate-200",
          th: "text-center",
          td: "text-center border-y border-gray-200",
        })}
      />

      <Pagination table={table} />
    </div>
  );
};

export default GuestsTable;
