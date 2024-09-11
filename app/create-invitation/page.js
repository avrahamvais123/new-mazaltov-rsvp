import React from "react";
import Progression from "./components/Progression";
import clientPromise from "@/lib/mongoDB";

const addDocument = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("myDatabase");
    const result = await db.collection("myCollection").insertOne({
      name: "John Doe",
      age: 30,
      email: "john@example.com",
    });
    console.log("Inserted document: ", result);
  } catch (e) {
    console.error("Failed to insert document: ", e);
  }
};

const Page = async () => {
  addDocument();
  return <Progression />;
};

export default Page;
