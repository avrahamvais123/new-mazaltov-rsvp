"use client";

import React from "react";

const ExtendedMenu = ({ editor, showExtendedMenu, content }) => {
  return (
    <>
      {showExtendedMenu !== "" ? (
        <div className="z-10 absolute top-0 right-full transition-all h-full w-64 flex-col-center justify-start bg-slate-800 brightness-90">
          {content}
        </div>
      ) : null}
    </>
  );
};

export default ExtendedMenu;
