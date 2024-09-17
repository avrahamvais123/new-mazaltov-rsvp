import dynamic from "next/dynamic";
import GuestsTable from "./components/GuestsTable";

/* const GuestsTable = dynamic(() => import("./components/GuestsTable"), {
  ssr: false,
}); */

const Page = () => {
  return <GuestsTable />;
};

export default Page;
