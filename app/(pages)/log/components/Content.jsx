"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Content() {
  const [navigationData, setNavigationData] = useState(null);

  const showResults = () => {
    const data = Cookies.get("navigationData");
    if (data) {
      setNavigationData(JSON.parse(data));
    }
  };

  return (
    <div className="size-full flex-col-center justify-start gap-4 p-4">
      <h1 className="text-6xl font-bold">למה לקנות כשאין לנו שקל?? למה???</h1>
      <img src="https://img.freepik.com/premium-photo/sad-looking-person-with-sad-face-his-head_1083198-4218.jpg?w=740" className="size-96" />
      {/* <button onClick={showResults} className="">
        show results
      </button>
      <h1>Navigation Data from Cookies</h1>
      {navigationData ? (
        <div className="size-full flex-col-center justify-start">
          <p>
            <strong>כותרת העמוד:</strong> {navigationData.title}
          </p>
          <p className="flex-center gap-2">
            <strong>כתובת:</strong>{" "}
            <a
              className="block max-w-[14rem] overflow-hidden text-ellipsis whitespace-nowrap"
              href={navigationData.url}
              title={navigationData.url} // מציג את ה-URL המלא ב-tooltip
            >
              {navigationData.url}
            </a>
          </p>
        </div>
      ) : (
        <p>No data found</p>
      )} */}
    </div>
  );
}

{
  /* useEffect(() => {
    // קריאת העוגיה מהדפדפן
    const data = Cookies.get("navigationData");
    if (data) {
      setNavigationData(JSON.parse(data));
    }
  }, []); */
}
