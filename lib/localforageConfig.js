import localforage from "localforage";

// הגדרת ה-driver ל-localStorage
localforage.config({
  driver: localforage.LOCALSTORAGE, // או localforage.INDEXEDDB או localforage.WEBSQL
  name: "aaa",
  version: 1.0,
  storeName: "create-invitation", // שם ה-store
  description: "נתוני יצירת הזמנה של הלקוח",
});
