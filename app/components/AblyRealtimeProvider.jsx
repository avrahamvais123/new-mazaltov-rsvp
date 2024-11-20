import { useRef } from "react";
//import * as Ably from "ably";
import Ably from "ably";
import { AblyProvider } from "ably/react";

export default function AblyRealtimeProvider({ children }) {
  const clientRef = useRef();

  if (!clientRef.current) {
    const client = new Ably.Realtime({
      key: process.env.NEXT_PUBLIC_ABLY_API_KEY,
    });
    clientRef.current = client;
  }

  return <AblyProvider client={clientRef.current}>{children}</AblyProvider>;
}
