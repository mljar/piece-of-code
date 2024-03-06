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
    <div className="mt-2">
      <label className="block text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        type="text"
        className="bg-gray-50 border border-gray-300 text-gray-900 
        rounded-md 
        focus:border-blue-500 block w-full p-1.5 
        focus:border
        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
        dark:text-white dark:focus:border-blue-400
     text-md outline-0"
        placeholder={name}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
};
