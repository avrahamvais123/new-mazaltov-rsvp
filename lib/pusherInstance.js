import Pusher from "pusher-js";

let pusherInstance = null;

export const getPusherInstance = () => {
  if (!pusherInstance) {
    pusherInstance = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: "eu",
    });
  }
  return pusherInstance;
};
