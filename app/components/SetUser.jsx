"use client";

import { userAtom } from "@/lib/jotai";
import { useSetAtom } from "jotai";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const SetUser = () => {
  const { data: session, status } = useSession();
  const setUser = useSetAtom(userAtom);

  useEffect(() => {
    if (session) {
      const { user } = session;
      setUser((prev) => ({ ...prev, ...user }));
    }
  }, [session]);

  return null;
};

export default SetUser;
