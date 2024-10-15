const { cn } = require("@/lib/utils");

export default function FloatingLabelInput() {
  return (
    <div className="relative w-full mt-5">
      <input
        type="text"
        id="floatingInput"
        className={cn(
          "block px-4 py-2 w-full",
          "text-sm text-gray-900 bg-transparent",
          "rounded-sm border border-gray-300",
          "appearance-none focus:outline-none",
          "focus:ring-0 focus:border-blue-600 peer"
        )}
        placeholder=" "
        data-has-content="true" // יש להגדיר את זה בדינמיות לפי התוכן מהשרת
      />
      <label
        htmlFor="floatingInput"
        className={cn(
          "absolute top-2 right-1 px-2 z-10",
          "text-sm text-gray-500 bg-white duration-300",
          "origin-[0] scale-75 transform",
          "peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0",
          "peer-focus:scale-75 peer-focus:-translate-y-4",
          "peer-focus:translate-x-2",
          "[data-has-content='true']:scale-75",
          "[data-has-content='true']:-translate-y-4"
        )}
      >
        אימייל
      </label>
    </div>
  );
}
