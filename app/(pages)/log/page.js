import React from "react";
import Content from "./components/Content";
import { cookies } from "next/headers";

const Page = () => {
  // קריאת עוגיה בצד השרת
  const cookieStore = cookies();
  const navigationData = cookieStore.get("navigationData");
  console.log("navigationData: ", navigationData);

  return <Content data={navigationData} />;
};

export default Page;

{
  /* <div>
      <h1>Navigation Data from Server-Side Cookies</h1>
      {navigationData ? (
        <div>
          <p>
            <strong>Title:</strong> {navigationData.value.title}
          </p>
          <p>
            <strong>URL:</strong> {navigationData.value.url}
          </p>
        </div>
      ) : (
        <p>No data found</p>
      )}
    </div> */
}
