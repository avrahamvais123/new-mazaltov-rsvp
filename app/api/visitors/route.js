import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

let activeVisitors = new Map();

export async function POST(request) {
  const { visitorId, page, isVisible, duration } = await request.json();

  // קבלת הנתונים הקיימים או יצירת אובייקט חדש
  const visitorData = activeVisitors.get(visitorId) || { pages: [], totalTimeSpent: 0 };

  // הוספת העמוד לרשימה בסדר כרונולוגי
  if (page) {
    visitorData.pages.push(page);
  }

  // עדכון זמן השהייה
  if (duration) {
    visitorData.totalTimeSpent += duration;
  }

  // עדכון מצב נראות
  if (typeof isVisible !== "undefined") {
    visitorData.isVisible = isVisible;
  }

  activeVisitors.set(visitorId, visitorData);

  // שידור עדכון למאזינים
  await pusher.trigger("public-visitors", "visitor-updated", {
    visitorId,
    ...visitorData,
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}

export async function DELETE(request) {
  const { visitorId, totalTimeSpent } = await request.json();

  if (activeVisitors.has(visitorId)) {
    const visitorData = activeVisitors.get(visitorId);

    // עדכון זמן השהייה הכולל
    visitorData.totalTimeSpent += totalTimeSpent || 0;

    activeVisitors.delete(visitorId);

    // שידור עזיבת מבקר
    await pusher.trigger("public-visitors", "visitor-left", {
      visitorId,
      totalTimeSpent: visitorData.totalTimeSpent,
      pages: visitorData.pages,
    });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
