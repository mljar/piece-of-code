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
  const optionsElements = options.map((option) => {
    const label = option[0];
    const value = option[1];
    return <option value={value} key={`${value}`}>{label}</option>;
  });
  return (
    <div>
      <div className="poc-mt-2">
        <label className="poc-block poc-text-sm poc-font-medium poc-text-gray-900 dark:poc-text-white">
          {label}
        </label>
        <select
          value={option}
          onChange={(e) => setOption(e.target.value)}
          className="poc-border poc-rounded-md poc-block poc-w-full poc-p-2 
          poc-bg-gray-50 
          poc-border-gray-300 
          poc-text-gray-900 
          focus:poc-border-blue-500 
          focus:poc-border
          dark:poc-bg-gray-700 
          dark:poc-border-gray-600 
          dark:poc-placeholder-gray-400 
          dark:poc-text-white 
          poc-outline-none
          "
        >
          {optionsElements}
        </select>
      </div>
    </div>
  );
};
