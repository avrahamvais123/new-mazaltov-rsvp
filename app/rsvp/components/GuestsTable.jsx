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
import { useMutation, useQuery } from "@tanstack/react-query";
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
    מגיעים: 0,
    "לא מגיעים": 0,
    "אולי מגיעים": 0,
  });

  const getAllGuests = useMutation({
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

  const removeGuests = useMutation({
    mutationFn: async (ids) => {
      try {
        const res = await axios.delete("/api/guests", {
          data: { ids: ids },
        });
        console.log("res: ", res);
      } catch (error) {
        console.error(
          "Error removing all guests: ",
          error.response?.data || error.message
        );
      }
    },
    onSuccess: async () => {
      getAllGuests.mutate();
    },
  });

  const editGuest = useMutation({
    mutationFn: async (data) => {
      const { _id, ...updates } = data;
      try {
        const res = await axios.patch("/api/guests", {
          id: _id,
          updates: updates,
        });
        console.log("res: ", res);
      } catch (error) {
        console.error(
          "Error creating guest: ",
          error.response?.data || error.message
        );
      }
    },
    onSuccess: async () => {
      getAllGuests.mutate();
    },
  });

  useEffect(() => {
    getAllGuests.mutate();
  }, []);

  const table = useReactTable({
    columns: columns({
      data,
      setData,
      mode,
      setMode,
      editValue,
      setEditValue,
      editGuest,
      removeGuests,
    }),
    data: data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    //initialState: { pagination: { pageSize: 50 } }, // למשל 50 שורות בעמוד
    enableRowSelection: true,
    getRowId: (row, index) => row?._id,
    enableHiding: true,
  });

  return (
    <div className="size-full p-4 py-8 pb-0 overflow-hidden flex-col-center">
      {/* total */}
      <TotalGuests status={status} data={data} setStatus={setStatus} />

      {/* table header */}
      <TableHeader
        table={table}
        getAllGuests={getAllGuests}
        removeGuests={removeGuests}
        setData={setData}
      />

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

      {/* table pagination */}
      <Pagination table={table} />
    </div>
  );
};

export default GuestsTable;

/* const removeGuests = async () => {
    const guestsToRemove = table
      ?.getSelectedRowModel()
      .rows.map((row) => row?.id);
    console.log("guestsToRemove: ", guestsToRemove);

    try {
      const res = await axios.delete("/api/guests", {
        data: { ids: guestsToRemove },
      });
      getAllGuests();
      console.log("res: ", res);
    } catch (error) {
      console.error(
        "Error removing all guests: ",
        error.response?.data || error.message
      );
    }
  }; */
