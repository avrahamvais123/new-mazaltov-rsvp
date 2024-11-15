import { Delete02Icon, Edit02Icon, PaintBoardIcon, PartyIcon } from "@/app/icons/icons";

export const actions = ({ user, setDialogDetails, setOpenDialog }) => [
    /* אירועים */
    {
      text: (
        <div className="flex-center gap-2">
          <PartyIcon className="size-5 text-slate-400" />
          אירועים
        </div>
      ),
      action: (e) => {
        console.log("events", user);
        setOpenDialog(true);
        setDialogDetails({
          title: "כל האירועים של הלקוח",
          content: () => (
            <div>{`האם אתה בטוח שברצונך לערוך את ${user?.name}?`}</div>
          ),
          onConfirm: () => {
            console.log("הלקוח נערך בהצלחה!!");
          },
        });
      },
    },
    /* עיצובים */
    {
      text: (
        <div className="flex-center gap-2">
          <PaintBoardIcon className="size-5 text-slate-400" />
          עיצובים
        </div>
      ),
      action: (e) => {
        console.log("designs", user);
        setOpenDialog(true);
        setDialogDetails({
          title: "כל העיצובים של הלקוח",
          content: () => (
            <div>{`האם אתה בטוח שברצונך לערוך את ${user?.name}?`}</div>
          ),
          onConfirm: () => {
            console.log("הלקוח נערך בהצלחה!!");
          },
        });
      },
    },
    /* עריכת לקוח */
    {
      text: (
        <div className="flex-center gap-2">
          <Edit02Icon className="size-5 text-slate-400" />
          עריכת לקוח
        </div>
      ),
      action: (e) => {
        console.log("edit", user);
        setOpenDialog(true);
        setDialogDetails({
          title: "עריכת לקוח",
          content: () => (
            <div>{`האם אתה בטוח שברצונך לערוך את ${user?.name}?`}</div>
          ),
          onConfirm: () => {
            console.log("הלקוח נערך בהצלחה!!");
          },
        });
      },
    },
    /* מחיקת לקוח */
    {
      text: (
        <div className="flex-center gap-2">
          <Delete02Icon className="size-5 text-slate-400" />
          מחיקת לקוח
        </div>
      ),
  
      action: (e) => {
        console.log("delete", user);
        setOpenDialog(true);
        setDialogDetails({
          title: "מחיקת לקוח",
          content: () => (
            <div>{`האם אתה בטוח שברצונך למחוק את ${user?.name}?`}</div>
          ),
          onConfirm: () => {
            console.log("הלקוח נמחק בהצלחה!!");
          },
        });
      },
    },
  ];