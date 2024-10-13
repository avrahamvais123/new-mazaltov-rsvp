"use client";

import axios from "axios";
import React from "react";

const Passowrd = () => {
  const getAccess = async () => {
    try {
      const res = await axios.get(
        "/api/users/password-confirmation?password=123456"
      );
      console.log("res: ", res);
    } catch (error) {
      console.error("error: ", error);
    }
  };

  return (
    <div className="size-full md:size-96 border md:rounded-sm">
      <button onClick={getAccess} className="">
        get access
      </button>
    </div>
  );
};

export default Passowrd;
