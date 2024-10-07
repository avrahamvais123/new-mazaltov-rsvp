export default function Collapse() {
  const toggleCollapse = (e) => {
    const button = e.currentTarget;
    const content = button.nextElementSibling;
    const isOpen = button.getAttribute("data-open") === "true";

    button.setAttribute("data-open", !isOpen);
    if (isOpen) {
      content.classList.add("hidden");
      content.classList.remove("block");
    } else {
      content.classList.remove("hidden");
      content.classList.add("block");
    }
  };

  return (
    <div>
      <button
        data-open="false"
        onClick={toggleCollapse}
        className="py-2 px-4 bg-blue-500 text-white rounded"
      >
        Toggle Details
      </button>
      <div className="hidden mt-2 p-4 bg-gray-100 rounded">
        Here are the details!
      </div>
    </div>
  );
}
