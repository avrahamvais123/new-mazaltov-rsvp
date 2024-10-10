"use client";

import React from "react";

const Page = () => {
  // קבוע
  const men = "חיים";

  // קבוע
  let women = "שושי";

  // אובייקט
  const user = {
    name: "משה",
    age: 57,
    phone: "0548165639",
    address: {
      city: "ירושלים",
      street: "הרצל",
      number: 12,
    },
  };

  // מערך
  const array = [1, { name: "שלמה" }, ["מערך", "מערך 2"], 4, 5];

  /* פונקציה */
  const foo = () => {
    const aaa = "משהו";
    console.log("aaa: ", aaa);

    array[5] = "aaa";

    return array[5];
  };

  return (
    <>
      {/* שימוש באובייקט */}
      <div>{user.name}</div>

      <button onClick={() => foo()}>click me</button>

      {/* שימוש בפונקציה */}
      {/* <div>{foo()}</div> */}
    </>
  );
};

export default Page;
