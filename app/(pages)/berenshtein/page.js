import { redirect } from "next/navigation";
import React from "react";

const email = "maya_b_i@walla.com";
const client = "משפחת ברנשטיין";
const title = "הזמנה לבר המצווה של";
const name = "נועם ברנשטיין";
const waze =
  "https://www.waze.com/en/live-map/directions/il/%D7%9E%D7%97%D7%95%D7%96-%D7%94%D7%93%D7%A8%D7%95%D7%9D/%D7%90%D7%A9%D7%93%D7%95%D7%93/%D7%94%D7%99%D7%9C%D7%94-%D7%90%D7%99%D7%A8%D7%95%D7%A2%D7%99-%D7%99%D7%95%D7%A7%D7%A8%D7%94?place=ChIJR4WYRKejAhUREGonwPKTNrw";
const googleMap =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3108.8601689939364!2d34.664650188766714!3d31.818571691956798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1502a3a744988547%3A0xbc3693f2c0276a10!2z15TXmdec15Qg15DXmdeo15XXoteZINeZ15XXp9eo15Q!5e0!3m2!1siw!2sil!4v1731490077928!5m2!1siw!2sil";
const img_1 =
  "https://res.cloudinary.com/djo57yh6l/image/upload/v1731489497/mazaltov-rsvp/invitations/67346dc5d03af4792fe092ed-1.jpg";
const img_2 =
  "https://res.cloudinary.com/djo57yh6l/image/upload/v1731489497/mazaltov-rsvp/invitations/67346dc5d03af4792fe092ed-2.jpg";

const Page = () => {
  redirect(
    `https://www.mazaltov-rsvp.co.il/invitation?email=${email}&client=${client}&title=${title}&name=${name}&waze=${waze}&gm=${googleMap}&img_1=${img_1}&img_2=${img_2}`
  );
};

export default Page;

//`https://www.mazaltov-rsvp.co.il/invitation?email=maya_b_i@walla.com&client=%D7%9E%D7%A9%D7%A4%D7%97%D7%AA%20%D7%91%D7%A8%D7%A0%D7%A9%D7%98%D7%99%D7%99%D7%9F&title=%D7%94%D7%96%D7%9E%D7%A0%D7%94%20%D7%9C%D7%91%D7%A8%20%D7%94%D7%9E%D7%A6%D7%95%D7%95%D7%94%20%D7%A9%D7%9C&name=%D7%A0%D7%95%D7%A2%D7%9D%20%D7%91%D7%A8%D7%A0%D7%A9%D7%98%D7%99%D7%99%D7%9F&waze=https://www.waze.com/en/live-map/directions/il/%D7%9E%D7%97%D7%95%D7%96-%D7%94%D7%93%D7%A8%D7%95%D7%9D/%D7%90%D7%A9%D7%93%D7%95%D7%93/%D7%94%D7%99%D7%9C%D7%94-%D7%90%D7%99%D7%A8%D7%95%D7%A2%D7%99-%D7%99%D7%95%D7%A7%D7%A8%D7%94?place=ChIJR4WYRKejAhUREGonwPKTNrw&gm=https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3108.8601689939364!2d34.664650188766714!3d31.818571691956798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1502a3a744988547%3A0xbc3693f2c0276a10!2z15TXmdec15Qg15DXmdeo15XXoteZINeZ15XXp9eo15Q!5e0!3m2!1siw!2sil!4v1731490077928!5m2!1siw!2sil&img_1=https://res.cloudinary.com/djo57yh6l/image/upload/v1731489497/mazaltov-rsvp/invitations/67346dc5d03af4792fe092ed-1.jpg&img_2=https://res.cloudinary.com/djo57yh6l/image/upload/v1731489497/mazaltov-rsvp/invitations/67346dc5d03af4792fe092ed-2.jpg`;
