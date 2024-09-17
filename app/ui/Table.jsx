"use client";

import { cn } from "@/lib/utils";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useEffect } from "react";

const Table = ({
  data,
  columns,
  classNames = () => {},
  getTable = () => {},
}) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    //initialState: { pagination: { pageSize: 50 } }, // למשל 50 שורות בעמוד
  });

  useEffect(() => {
    getTable(table);
  }, [table]);

  return (
    <div className={cn(classNames()?.wrapper)}>
      <table
        className={cn(
          "min-w-full divide-y divide-slate-200",
          classNames()?.table
        )}
      >
        {/* thead */}
        <thead className={cn("bg-slate-50", classNames()?.thead)}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className={classNames()?.tr}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={cn(
                    "px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider",
                    classNames()?.th
                  )}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        {/* tbody */}
        <tbody
          className={cn(
            "bg-white divide-y divide-slate-200",
            classNames()?.tbody
          )}
        >
          {table.getRowModel().rows.map((row, rowIndex) => (
            <tr key={row.id} className={cn(classNames()?.tr)}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={cn(
                    "p-4 whitespace-nowrap text-sm text-slate-900",
                    classNames()?.td
                  )}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
