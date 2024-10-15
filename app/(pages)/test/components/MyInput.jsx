"use client";

import React, { useState } from "react";
import MyButton from "./MyButton";
const MyInput = (props) => {
  const [state, setState] = useState("");
  const [display, setDisplay] = useState("");

  const onChange = (event) => {
    console.log("event.target.value: ", event.target.value);
    setState(event.target.value);
  };

  return (
    <div className="flex-col-center items-start">
      <label htmlFor="my-input">לייבל</label>
      <input
        onChange={onChange}
        placeholder="הקלד כאן.."
        className="border border-slate-300 p-2 rounded-sm"
      />
      <MyButton onClick={() => setDisplay(state)}>לחץ עליי</MyButton>
      {display}
    </div>
  );
};

export default MyInput;
