import React from "react";
import Select from "react-select";

interface SelectProps {
  label: string;
  option: string[]; // selected value
  options: [string, string][]; // array of title, value
  setOption: React.Dispatch<React.SetStateAction<string[]>>;
}

export const MultiSelect: React.FC<SelectProps> = ({
  label,
  option,
  options,
  setOption,
}: SelectProps) => {
  const optionsList = options.map((option) => {
    const label = option[0];
    const value = option[1];
    return { value, label };
  });
  return (
    <div>
      <div className="mt-2">
        <label className="block text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </label>
        <Select 
          options={optionsList}
          isMulti={true}
          onChange={(e) => {
            console.log(e);
          }}
        />
      </div>
    </div>
  );
};
