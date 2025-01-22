import React, { Suspense } from "react";
import Invitation from "./components/Invitation";

/* export async function generateMetadata({ searchParams }) {
  const { title } = await searchParams;
  return {
    title: title || "מזל טוב אישורי הגעה",
    description: title || "מזל טוב אישורי הגעה",
  };
} */

const Page =  () => {

  return (
    <Suspense fallback={<div>טוען הזמנה...</div>}><Invitation /></Suspense>
    
  );
};


export default Page;

