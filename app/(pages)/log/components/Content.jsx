"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Content() {
  const [navigationData, setNavigationData] = useState(null);

  /* useEffect(() => {
    // קריאת העוגיה מהדפדפן
    const data = Cookies.get("navigationData");
    if (data) {
      setNavigationData(JSON.parse(data));
    }
  }, []); */

  const showResults = () => {
    const data = Cookies.get("navigationData");
    if (data) {
      setNavigationData(JSON.parse(data));
    }
  };

  return (
    <div className="size-full flex-col-center justify-start p-4">
      <button onClick={showResults} className="">
        show results
      </button>
      <h1>Navigation Data from Cookies</h1>
      {navigationData ? (
        <div className="size-full flex-col-center justify-start">
          <p>
            <strong>כותרת העמוד:</strong> {navigationData.title}
          </p>
          <p>
            <strong>כתובת:</strong> <a className="truncate w-10" href={navigationData.url}>{navigationData.url}</a>
          </p>

          <p className="truncate w-10">sdhjfgjhsdgfhjsagdhjfgsdhjfghjsdgfjgsdjhagfhjgsdhjgfjjfsdhjfghjsgdhjfgsdhjgfjhsgdhjafghjsdagfhjsdgahjfghjsdagfhjgsdahjf</p>
        </div>
      ) : (
        <p>No data found</p>
      )}
    </div>
  );
}
