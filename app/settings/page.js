import { getServerSession } from "next-auth";
import React from "react";

const Page = async () => {
  const session = await getServerSession();
  console.log("session: ", session);

  return (
    <div>
      <h1>Settings</h1>
    </div>
  );
};

export default Page;
