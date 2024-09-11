import { atom } from "jotai";

export const userAtom = atom({
  id: "",
  name: "אורח",
  email: "example@email.com",
  password: "",
  image: "",
});

export const eventAtom = atom({
  id: "",
  name: "",
  type: "",
  date: "",
  time: "",
  googleMapsLink: "",
  wazeLink: "",
  guests: [],
  isPaid: false,
});

export const invitation_details_Atom = atom({
  date: "02-05-2023",
  eventType: "בר מצווה",
  groom_name: "אליהו",
  bride_name: "",
  groom_parents: "אבא ואמא",
  bride_parents: "",
  place: "בית הכנסת",
  address: "רחוב הרצל 12, תל אביב",
  time: "18:00",
  reception_time: "",
  reception_hupa: "",
});
