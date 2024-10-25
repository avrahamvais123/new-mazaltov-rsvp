import { getCollection } from "@/lib/mongoDB";
import { NextResponse } from "next/server";
import { Resend } from "resend";

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
      //to: "avrahamvais123@gmail.com",
      subject: `${name} ${status}`,
      html: `
            <table dir="rtl" width="100%" height="100%" style="box-sizing: border-box; background-color: #F4F4F4; font-family: Arial, sans-serif; line-height: 1.5; padding: 30px; padding-right: 200px; padding-left: 200px; text-align: center;">
              <tr>
                <td style="background-color: white; padding: 4px;">
                  <h1>שלום, ${client}!</h1>

                  <h4 style="line-height: 0.1;">אנו מעדכנים אותך כי:<br />
                  <h2>${data?.name} ${data?.status} לאירוע</h2>
                  </h4>

                  <h4 style="line-height: 0.1;">מספר המגיעים הינו:<br />
                  <h2>${
                    data?.status !== "לא מגיעים" ? data?.quantity : "0"
                  }</h2>
                  </h4>

                  <h4 style="line-height: 0.1;">ברכות ואיחולים שהשאירו עבורך: <br />
                  <h2>${data?.congratulations}</h2>
                  </h4>

                  <p>בברכה,<br />צוות מזל טוב אישורי הגעה</p>

                </td>
              </tr>
            </table>
          `,
    });

    return NextResponse.json({ message: "success", data: results });
  } catch (error) {
    console.error("error: ", error);
    return NextResponse.json({ error }, { status: 500 });
  }
};
