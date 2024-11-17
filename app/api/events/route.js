import { getCollection } from "@/lib/mongoDB";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const GET = async (req) => {
  try {
    const url = new URL(req.url); // מקבל את ה-URL המלא
    const linkedEmail = url.searchParams.get("linkedEmail"); // שואב את האימייל מתוך ה-URL

    const eventsCollection = await getCollection("events");
    const events = await eventsCollection
      .find({
        linkedEmail: linkedEmail,
      })
      .toArray();

    console.log("events: ", events);

    return NextResponse.json({ events });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const POST = async (req) => {
  try {
    const formData = await req.formData();
    const linkedUserId = formData.get("linkedUserId");
    const eventType = formData.get("eventType");
    const linkedEmail = formData.get("linkedEmail");
    const title = formData.get("title");
    const client = formData.get("client");
    const waze = formData.get("waze");
    const googleMap = formData.get("googleMap");
    const date = formData.get("date");
    const img_1 = formData.get("img_1");
    const img_2 = formData.get("img_2");

    const data = {
      linkedUserId: new ObjectId(linkedUserId),
      eventType,
      linkedEmail,
      title,
      client,
      waze,
      googleMap,
      date,
    };

    const eventsCollection = await getCollection("events");
    const event = await eventsCollection.findOne({
      $and: [{ linkedEmail: linkedEmail }, { title: title }, { date: date }],
    });

    console.log("event: ", event);

    if (!event) {
      const eventResult = await eventsCollection.insertOne(data);
      console.log("eventResult: ", eventResult);
      const eventId = eventResult.insertedId.toString();
      console.log("eventId: ", eventId);

      const uploadImageToCloudinary = async (file, public_id) => {
        // Convert file to a Base64 string
        const buffer = await file.arrayBuffer();
        const base64String = Buffer.from(buffer).toString("base64");
        const base64Image = `data:${file.type};base64,${base64String}`;

        // Upload to Cloudinary
        const img_res = await cloudinary.uploader.upload(base64Image, {
          upload_preset: "my_upload_preset",
          folder: "mazaltov-rsvp/invitations",
          unique_filename: true,
          public_id: public_id,
          resource_type: "auto",
          overwrite: true,
        });

        return img_res;
      };

      const { secure_url: imgae_1 } = await uploadImageToCloudinary(
        img_1,
        `${eventId}-1`
      );
      console.log("imgae_1: ", imgae_1);
      const { secure_url: imgae_2 } = await uploadImageToCloudinary(
        img_2,
        `${eventId}-2`
      );
      console.log("imgae_2: ", imgae_2);

      const link = `https://www.mazaltov-rsvp.co.il/invitation?email=${linkedEmail}&client=${client}&title=${title}&name=${client}&waze=${waze}&gm=${googleMap}&img_1=${imgae_1}&img_2=${imgae_2}`;

      const updatedEvent = await eventsCollection.findOneAndUpdate(
        { _id: eventResult.insertedId },
        {
          $set: {
            link: link,
            img_1: imgae_1,
            img_2: imgae_2,
          },
        },
        { returnDocument: "after" }
      );

      console.log("updatedEvent: ", updatedEvent);

      return NextResponse.json({
        message: "האירוע נשמר בהצלחה",
        updatedEvent,
      });
    }

    return NextResponse.json({
      message: "האירוע כבר קיים",
      data,
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
