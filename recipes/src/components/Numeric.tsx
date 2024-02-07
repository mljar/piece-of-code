import React from "react";

interface NumericProps {
  label: string;
  name: number;
  setName: React.Dispatch<React.SetStateAction<number>>;
}

export const Numeric: React.FC<NumericProps> = ({
  label,
  name,
  setName,
}: NumericProps) => {
  return (
    <div  className="mt-2">
      <label className="block text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        type="number"
        className="bg-gray-50 border border-gray-300 text-gray-900 
        rounded-md 
        focus:border-blue-500 block w-full p-1.5 
        focus:border-2
        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
        dark:text-white dark:focus:border-blue-400
     text-md outline-0"
        value={name}
        onChange={(e) => setName(parseInt(e.target.value))}
      />
    </div>
  );
};
