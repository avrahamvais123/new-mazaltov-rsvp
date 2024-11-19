import redis from "./redis";

// שמירת קוד האימות ב-Redis עם זמן תפוגה
export const saveVerificationCode = async (email, code, ttl = 600) => {
  await redis.set(`verification:${email}`, code, { ex: ttl }); // TTL בשניות
};

// אימות קוד האימות
export const verifyCode = async (email, code) => {
  console.log("code: ", code);
  const storedCode = await redis.get(`verification:${email}`);
  console.log("storedCode: ", storedCode);
  if (storedCode === Number(code)) {
    await redis.del(`verification:${email}`); // מחיקת הקוד לאחר אימות
    return true;
  }
  return false;
};
