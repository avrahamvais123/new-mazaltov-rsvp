"use client";

import React from "react";

const ExtendedMenu = ({ content }) => {
  return (
    <>
      {content ? (
        <div className="absolute top-0 right-full h-full w-64 p-4 flex-col-center justify-start transition-all bg-slate-800 brightness-90">
          {content}
        </div>
      ) : null}
    </>
  );
};

export default ExtendedMenu;
