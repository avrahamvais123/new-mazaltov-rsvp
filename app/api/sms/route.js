import axios from "axios";

export async function POST(req) {
  const { msg, recipient } = await req.json();
  console.log("recipient: ", recipient);
  console.log("msg: ", msg);

  const key = process.env.SMS4FREE_KEY;
  const user = process.env.SMS4FREE_USER;
  const pass = process.env.SMS4FREE_PASS;

  if (!msg || !recipient) {
    return new Response(
      JSON.stringify({
        status: 400,
        error: "ההודעה או המספרים חסרים",
      }),
      { status: 400 }
    );
  }

  try {
    const results = await axios.post(
      "https://api.sms4free.co.il/ApiSMS/v2/SendSMS",
      {
        key: key,
        user: user,
        pass: pass,
        sender: "mazaltov",
        msg: msg,
        recipient: recipient,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log("results: ", results?.data);

    return new Response(JSON.stringify({ data: results.data }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error sending SMS:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
