"use client";

import Table from "@/app/ui/Table";
import React, { useCallback, useEffect, useState } from "react";
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
import { useSession } from "next-auth/react";
import Loader from "@/app/ui/Loader";
import { useRouter } from "next/navigation";

const fetchGuests = async ({ queryKey }) => {
  const [, email] = queryKey;
  try {
    const res = await axios.get(`/api/guests?belongsTo=${email}`);
    return res?.data?.data;
  } catch (error) {
    console.error(
      "Error fetching guests: ",
      error.response?.data || error.message
    );
  }
};

const GuestsTable = () => {
  const router = useRouter();
  const { data: session, status: dataStatus } = useSession();
  const [status, setStatus] = useState({
    מגיעים: 0,
    "לא מגיעים": 0,
    "אולי מגיעים": 0,
  });

  // רידיירקט כאשר אין סשן
  useEffect(() => {
    if (!session && dataStatus !== "loading") {
      router.push("/auth/signin");
    }
  }, [session, dataStatus, router]);

  // שימוש ב-useQuery עם enabled כדי להימנע מהפעלה מיותרת כשאין session
  const { data = [], isLoading, refetch, status: statusFetchGuests } = useQuery(
    {
      queryKey: ["guests", session?.user?.email],
      queryFn: ({ queryKey }) => fetchGuests({ queryKey, setStatus }),
      enabled: !!session?.user?.email,
      staleTime: 300000,
      select: (data) => {
        calaulateTotalStatus({ data });
        return data;
      },
    }
  );

  const calaulateTotalStatus = useCallback(
    ({ data }) => {
      const initialStatus = { מגיעים: 0, "לא מגיעים": 0, "אולי מגיעים": 0 };

      const result = data.reduce((acc, curr) => {
        acc[curr.status] = acc[curr.status] || 0;
        acc[curr.status] +=
          curr.status === "לא מגיעים" ? 1 : Number(curr.quantity);
        return acc;
      }, initialStatus);
      setStatus(result);
    },
    [data]
  );

  const removeGuests = useMutation({
    mutationFn: async (ids) => {
      try {
        const res = await axios.delete("/api/guests", {
          data: { ids, belongsTo: session?.user?.email },
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
      refetch();
    },
  });

  const editGuest = useMutation({
    mutationFn: async (data) => {
      const { _id, ...updates } = data;
      try {
        const res = await axios.patch("/api/guests", {
          id: _id,
          belongsTo: session?.user?.email,
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
      refetch();
    },
  });

  /* tableApi */
  const table = useReactTable({
    columns: columns({
      editGuest,
      removeGuests,
    }),
    data: data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    autoResetPageIndex: false,
    enableRowSelection: true,
    getRowId: (row, index) => row?._id,
  });

  if (!session) {
    return null; // תחזיר כלום בזמן שה-Effect מבצע את הרידיירקט
  }

  return (
    <>
      <Loader
        text="מעדכן נתונים..."
        isLoading={dataStatus === "loading" || isLoading}
      />

      <div className="size-full p-4 py-8 pb-0 overflow-hidden flex-col-center">
        {/* total */}
        <TotalGuests status={status} data={data} setStatus={setStatus} />

        {/* table header */}
        <TableHeader
          table={table}
          getAllGuests={fetchGuests}
          removeGuests={removeGuests}
          data={data}
          refetch={refetch}
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
    </>
  );
};

export default GuestsTable;
