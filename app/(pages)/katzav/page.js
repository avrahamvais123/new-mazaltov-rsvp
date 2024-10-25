import { redirect } from "next/navigation";
import React from "react";

const Page = () => {
  redirect(
    "https://www.mazaltov-rsvp.co.il/invitation?email=jkatzav%40gmail.com&client=%D7%92%D7%B3%D7%A7%D7%99%20%D7%A7%D7%A6%D7%91&title=%D7%94%D7%96%D7%9E%D7%A0%D7%94%20%D7%9C%D7%91%D7%A8%20%D7%94%D7%9E%D7%A6%D7%95%D7%95%D7%94%20%D7%A9%D7%9C&name=%D7%99%D7%A0%D7%95%D7%9F%20%D7%A7%D7%A6%D7%91&waze=https%3A%2F%2Ful.waze.com%2Ful%3Fplace%3DChIJG1cQcoo3HRUR2_WTdTdihbw&ll=32.11318290%2C34.90464740&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location&gm=https%3A%2F%2Fwww.google.com%2Fmaps%2Fembed%3Fpb%3D%211m18%211m12%211m3%211d3379.3746504919923%212d34.90722232478426%213d32.113182873948105%212m3%211f0%212f0%213f0%213m2%211i1024%212i768%214f13.1%213m3%211m2%211s0x151d378a7210571b%3A0xbc8562377593f5db%212zNTgg15LXnyDXkNeZ16jXldei15nXnQ%215e0%213m2%211siw%212sil%214v1729806621875%215m2%211siw%212sil&img_1=https%3A%2F%2Fres.cloudinary.com%2Fdjo57yh6l%2Fimage%2Fupload%2Fv1729845517%2Fmazaltov-rsvp%2Finvitations%2F671ab97aff1f7701c9dc311f-1.jpg&img_2=https%3A%2F%2Fres.cloudinary.com%2Fdjo57yh6l%2Fimage%2Fupload%2Fv1729845516%2Fmazaltov-rsvp%2Finvitations%2F671ab97aff1f7701c9dc311f-2.jpg"
  );
};

export default Page;
