import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID; // Account SID שלך
const authToken = process.env.TWILIO_AUTH_TOKEN; // Auth Token שלך
const client = twilio(accountSid, authToken);

export async function POST(request) {
  const { to, body } = await request.json();
  console.log("body: ", body);
  console.log("to: ", to);

  try {
    const message = await client.messages
      .create({
        from: "whatsapp:+14155238886", // המספר שלך ב-Twilio עם פרוטוקול WhatsApp
        to: `whatsapp:+972${to}`, // מספר הטלפון של הנמען עם פרוטוקול WhatsApp
        body, // תוכן ההודעה
      })
      .then((message) => console.log("message.sid: ", message.sid))
      .done();

    return Response(
      JSON.stringify({
        data: message,
        message: "ההודעה נשלחה בהצלחה",
        success: true,
        status: 200,
      })
    );
  } catch (error) {
    return Response(
      JSON.stringify({
        error: error,
        message: "ההודעה לא נשלחה",
        success: false,
        status: 500,
      }),
      { status: 500 }
    );
  }
}
