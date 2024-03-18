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
    <div  className="poc-mt-2">
      <label className="poc-block poc-text-sm poc-font-medium poc-text-gray-900 dark:poc-text-white">
        {label}
      </label>
      <input
        type="number"
        className="poc-bg-gray-50 poc-border poc-border-gray-300 poc-text-gray-900 
        poc-rounded-md 
        focus:poc-border-blue-500 poc-block poc-w-full poc-p-1.5 
        focus:poc-border
        dark:poc-bg-gray-700 dark:poc-border-gray-600 dark:poc-placeholder-gray-400 
        dark:poc-text-white dark:focus:poc-border-blue-400
     text-md outline-0"
        value={name}
        onChange={(e) => setName(parseInt(e.target.value))}
      />
    </div>
  );
};
