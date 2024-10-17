import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

export async function testConnection() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error: ", err);
  } finally {
    await client.close();
  }
}

