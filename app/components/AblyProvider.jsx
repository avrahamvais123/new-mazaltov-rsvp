"use client";

import { AblyProvider, ChannelProvider, useChannel, useConnectionStateListener } from 'ably/react';
import { getAblyClient } from "@/lib/ablyClient";
const client = getAblyClient();

export default function CustomAblyProvider({ children }) {
  return <AblyProvider client={client}>{children}</AblyProvider>;
}
