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
  img_1: {},
  img_2: {},
  sms: "",
  price: 0,
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
  img_1: {},
  img_2: {},
  date: "",
  eventType: "",
  groom_name: "",
  bride_name: "",
  groom_parents: "",
  bride_parents: "",
  place: "",
  address: "",
  time: "",
  reception_time: "",
  reception_hupa: "",
  googleMapsLink: "",
  wazeLink: "",
  price: 0,
});

export const canvas_Atom = atom(null);

export const canvas1_Atom = atom(null);

export const canvas2_Atom = atom(null);

export const editingMode_Atom = atom(false);

export const showGuideLine_vertical_Atom = atom(false);
export const showGuideLine_horizontal_Atom = atom(false);

export const catalog_editingMode_Atom = atom(false);
export const catalog_openCategory_Atom = atom(null);
