import { Delete02Icon, Edit02Icon } from "@/app/icons/icons";
import Checkbox from "@/app/ui/Checkbox";
import { cn } from "@/lib/utils";

export const columns = ({
  mode,
  setMode,
  setData,
  editValue,
  setEditValue,
}) => {
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
          <div className="size-full flex-center">
            <span
              className={cn("size-fit px-3 py-1 text-xs rounded-full", {
                "bg-green-600 text-white":
                  props?.row?.original?.status === "מגיעים",
                "bg-red-600 text-white":
                  props?.row?.original?.status === "לא מגיעים",
                "bg-slate-600 text-white":
                  props?.row?.original?.status === "אולי מגיעים",
              })}
            >
              {props?.row?.original?.status}
            </span>
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
      cell: ({ row }) => {
        return (
          <div className="size-full flex-center gap-2">
            <Edit02Icon
              className={cn(
                "size-5 cursor-pointer",
                "text-slate-600 transition-all",
                "hover:text-blue-600 active:text-blue-700"
              )}
            />
            <Delete02Icon
              className={cn(
                "size-5 cursor-pointer",
                "text-slate-600 transition-all",
                "hover:text-red-600 active:text-red-700"
              )}
            />
          </div>
        );
      },
    },
  ];
};
