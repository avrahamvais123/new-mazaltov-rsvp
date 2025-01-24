"use client";

import { redirect } from "next/navigation";
import React from "react";

const email = "yska.dimri@gmail.com";
const client = encodeURIComponent("משפחת דימרי");
const title = encodeURIComponent("הזמנה לבר המצווה של");
const name = encodeURIComponent("ישי");
const waze = encodeURIComponent(
  "https://www.waze.com/en/live-map/directions/%D7%90%D7%95%D7%9C%D7%9D-%D7%9B%D7%A8%D7%9E%D7%99%D7%9D-%D7%90%D7%9E%D7%A0%D7%95%D7%9F-%D7%95%D7%AA%D7%9E%D7%A8-%D7%92%D7%91%D7%A2%D7%AA-%D7%96%D7%90%D7%91?place=w.23068991.230427762.577617"
);
const googleMap = encodeURIComponent(
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3393.2495365731024!2d34.99340050000001!3d31.736389099999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1502c554a77b76e9%3A0xff41a331f4e8749e!2z15TXm9eo157XmdedIH4g15DXldec157XldeqINeQ15nXqNeV16LXmded!5e0!3m2!1siw!2sil!4v1737726099931!5m2!1siw!2sil"
);
const img_1 = encodeURIComponent(
  "https://res.cloudinary.com/djo57yh6l/image/upload/v1737725931/WhatsApp_Image_2025-01-20_at_20.20.01_xxamfn.jpg"
);
const img_2 = encodeURIComponent(
  "https://res.cloudinary.com/djo57yh6l/image/upload/v1737725946/WhatsApp_Image_2025-01-20_at_20.20.01_1_ftasox.jpg"
);

const url = `https://www.mazaltov-rsvp.co.il/invitation?email=${email}&client=${client}&title=${title}&name=${name}&waze=${waze}&gm=${googleMap}&img_1=${img_1}&img_2=${img_2}`;

const Page = () => {
  redirect(url); // Perform the redirect with the encoded URL
};

export default Page;
