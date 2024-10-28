"use client";

import NumberInput from "@/app/ui/NumberInput";
import { useState } from "react";

const Pagination = ({ table }) => {
  const [value, setValue] = useState(table.getState().pagination.pageIndex + 1);

  return (
    <div className="h-14 w-full py-8 px-4 border-t border-slate-200 flex-center justify-between gap-2">
      {/* מעבר לעמוד */}

      <NumberInput
        value={value}
        setValue={setValue}
        min={1}
        max={table.getPageCount()}
        onInput={(e) => {
          const page = e.target.value ? Number(e.target.value) - 1 : 1;
          table.setPageIndex(page);
        }}
        onIncrement={() => table?.nextPage()}
        onDecrement={() => table?.previousPage()}
      />

      <span className="flex items-center gap-1 text-sm">
        <span>עמוד {table.getState().pagination.pageIndex + 1}</span>
        <span>מתוך {table.getPageCount().toLocaleString()}</span>
      </span>
    </div>
  );
};
export default Pagination;
