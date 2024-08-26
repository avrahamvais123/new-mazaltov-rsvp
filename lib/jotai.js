import { atom } from "jotai";

export const userAtom = atom({
  id: "",
  name: "אורח",
  email: "example@email.com",
  image: "",
  isPaid: false,
});
