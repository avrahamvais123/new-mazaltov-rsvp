import { MongoClient } from "mongodb";

let client;
let clientPromise;

const uri = process.env.MONGODB_URI;
const options = {};

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

/* // בטל את הקוד הגלובלי לסביבת פיתוח
client = new MongoClient(uri, options);

clientPromise = client.connect().catch((err) => {
  console.error("MongoClient connection error:", err);
  throw err;
}); */

// שימוש בחיבור גלובלי גם בסביבת הפיתוח וגם בסביבת הייצור
if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

// פונקציה כללית להתחברות למסד נתונים ולקולקשיין
export async function getDatabase(dataBaseName) {
  const client = await clientPromise;
  const db = client.db(dataBaseName || "mazaltov-rsvp"); // שם מסד הנתונים
  return db;
}

export async function getCollection(collectionName) {
  const db = await getDatabase();
  const collection = db.collection(collectionName); // שם הקולקשיין
  return collection;
}

// פונקציות מותאמות לקולקשיין
export async function get(collectionName, filter = {}) {
  const collection = await getCollection(collectionName);
  const documents = await collection.find(filter).toArray();
  return documents;
}

export async function insert(collectionName, document) {
  const collection = await getCollection(collectionName);
  const result = await collection.insertOne(document);
  return result;
}

export default clientPromise;

/* if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
} */
