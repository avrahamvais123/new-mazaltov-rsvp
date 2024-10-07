import GuestsTable from "./components/GuestsTable";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

const Page = async () => {
  const session = await auth();
  console.log("session: ", session);

  if (!session) {
    // אם אין session, הפנה את המשתמש לדף הכניסה
    redirect("/auth/signin");
  }

  return <GuestsTable />;
};

export default Page;
