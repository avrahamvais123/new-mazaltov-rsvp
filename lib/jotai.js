import { atom } from "jotai";

export const userAtom = atom({
  id: "",
  name: "אורח",
  email: "example@email.com",
  image: "",
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

export const invitation_text_Atom = atom({
  text_1: `בשבח והודיה לה׳ יתברך
  אנו שמחים להזמינכם להשתתף עמנו
  בשמחת בר המצווה של בננו היקר`,
  text_2: `שתיערך אי׳׳ה ביום`,
});
