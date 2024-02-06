import React from "react";

interface SelectProps {
  label: string;
  option: string; // selected value
  options: [string, string][]; // array of title, value
  setOption: React.Dispatch<React.SetStateAction<string>>;
}

export const Select: React.FC<SelectProps> = ({
  label,
  option,
  options,
  setOption,
}: SelectProps) => {
  console.log(options);
  const optionsElements = options.map((option) => {
    const label = option[0];
    const value = option[1];
    return <option value={value}>{label}</option>;
  });
  return (
    <div>
      <div className="mt-2">
        <label className="block text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </label>
        <select
          value={option}
          onChange={(e) => setOption(e.target.value)}
          className="border rounded-md block w-full p-1.5 
          bg-gray-50 
          border-gray-300 
          text-gray-900 
          focus:border-blue-500 
          focus:border-2
          dark:bg-gray-700 
          dark:border-gray-600 
          dark:placeholder-gray-400 
          dark:text-white 
          outline-none
          "
        >
          {optionsElements}
        </select>
      </div>
    </div>
  );
};
