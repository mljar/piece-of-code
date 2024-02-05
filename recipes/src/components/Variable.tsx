import React from "react";

interface VariableProps {
  description: string;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

export const Variable: React.FC<VariableProps> = ({
  description,
  name,
  setName,
}: VariableProps) => {
  return (
    <div >
      <label className="block text-sm font-medium text-gray-900 dark:text-white">
        {description}
      </label>
      <input
        type="text"
        className="bg-gray-50 border border-gray-300 text-gray-900 
        rounded-md 

        focus:border-blue-500 block w-full p-1.5 
        focus:border-2
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

// className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
//     text-md"