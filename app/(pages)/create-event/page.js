import React from "react";
import Progression from "./components/Progression";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  return <Progression />;
};

export default Page;
