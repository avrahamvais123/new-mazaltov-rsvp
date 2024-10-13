import { MailAtSign01Icon, PassportIcon } from "@/app/icons/icons";
import { getCollection } from "@/lib/mongoDB";
import Image from "next/image";
import React from "react";
import Passowrd from "./components/Passowrd";

const Page = async () => {
  const usersCollection = await getCollection("users");
  const users = await usersCollection.find().toArray();

  if (!users) return null;

  return (
    <>
      <Passowrd />
      <div className="size-full flex-col-center justify-start items-start gap-4 p-4">
        <h1 className="text-2xl font-bold mb-8">רשימת לקוחות</h1>

        <div className="w-full flex-col-center items-start -space-y">
          {users.map((user, idx) => {
            return (
              <>
                <div
                  key={user?._id.toString()}
                  className="w-full p-4 flex-center justify-start items-start gap-4 border-b first:border-t"
                >
                  <Image
                    src={user?.image || "/images/user-1.png"}
                    alt="תמונת המשתמש"
                    width={45}
                    height={45}
                    className="rounded-full bg-slate-50 ring-4 ring-slate-100"
                  />
                  <div className="flex-col-center justify-start items-start gap-0.5">
                    <h1 className="font-bold mb-1 -mt-1">{user?.name}</h1>
                    <span className="flex-center justify-start gap-2">
                      <PassportIcon className="size-5 text-slate-400" />
                      <p className="text-sm">{user?._id.toString()}</p>
                    </span>

                    <span className="flex-center justify-start gap-2">
                      <MailAtSign01Icon className="size-5 text-slate-400" />
                      <p className="text-sm">{user?.email}</p>
                    </span>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Page;
