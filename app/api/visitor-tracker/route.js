import Ably from "ably/promises";

const ably = new Ably.Realtime.Promise(process.env.ABLY_API_KEY);
const channel = ably.channels.get("visitor-tracker");

export async function POST(req) {
  const body = await req.json();
  const { action, data } = body;

  if (action === "log") {
    // שלח את המידע לערוץ
    await channel.publish(data.type, data);
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
