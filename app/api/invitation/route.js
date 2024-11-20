import { getCollection } from "@/lib/mongoDB";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { rsvpMessageHtml, html1 } from "@/app/email-templates/emailTemplates";

const RESEND_API_KEY = process.env.RESEND_API_KEY;

const resend = new Resend(RESEND_API_KEY);

export const POST = async (req) => {
  try {
    const data = await req.json();
    console.log("data: ", data);
    const { name, quantity, status, belongsTo, client } = data;

    const guestsCollection = await getCollection("guests");
    const results = await guestsCollection.insertOne({
      name,
      quantity,
      status,
      belongsTo,
    });

    resend.emails.send({
      from: "מזל טוב אישורי הגעה <support@mazaltov-rsvp.co.il>",
      to: belongsTo,
      subject: `${name} ${status}`,
      html: rsvpMessageHtml(client, name, status),
    });

    return NextResponse.json({ message: "success", data: results });
  } catch (error) {
    console.error("error: ", error);
    return NextResponse.json({ error }, { status: 500 });
  }
};
