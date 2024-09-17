import React, { useState } from "react";

const NumberInput = () => {
  const [value, setValue] = useState(0);

  const increment = () => setValue(value + 1);
  const decrement = () => setValue(value > 0 ? value - 1 : 0); // לא יורד מתחת לאפס

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={decrement}
        className="px-4 py-2 text-lg text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-r-md focus:outline-none transition-all duration-300"
      >
        -
      </button>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-20 text-center px-2 py-2 text-lg border-t border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-all duration-300"
      />
      <button
        onClick={increment}
        className="px-4 py-2 text-lg text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-l-md focus:outline-none transition-all duration-300"
      >
        +
      </button>
    </div>
  );
};

export default NumberInput;
