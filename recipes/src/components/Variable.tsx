import React from "react";

interface VariableProps {
  label: string;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

export const Variable: React.FC<VariableProps> = ({
  label,
  name,
  setName,
}: VariableProps) => {
  return (
    <div className="poc-mt-2">
      <label className="poc-block poc-text-sm poc-font-medium poc-text-gray-900 dark:poc-text-white">
        {label}
      </label>
      <input
        type="text"
        className="poc-bg-gray-50 poc-border poc-border-gray-300 poc-text-gray-900 
        poc-rounded-md 
        focus:poc-border-blue-500 poc-block poc-w-full poc-p-1.5 
        focus:poc-border
        dark:poc-bg-gray-700 dark:poc-border-gray-600 dark:poc-placeholder-gray-400 
        dark:poc-text-white dark:focus:poc-border-blue-400
        poc-outline-0"
        placeholder={name}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
};
