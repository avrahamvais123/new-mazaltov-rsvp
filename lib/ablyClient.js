import Ably from "ably";

let ablyClient;

export const getAblyClient = () => {
  if (!ablyClient) {
    ablyClient = new Ably.Realtime({
      key: process.env.NEXT_PUBLIC_ABLY_API_KEY,
    });
  }
  return ablyClient;
};
