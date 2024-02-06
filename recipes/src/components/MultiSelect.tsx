import React from "react";
import Select, { MultiValue } from "react-select";

export type Option = {
  value: string;
  label: string;
};

interface SelectProps {
  label: string;
  option: Option[]; // selected value
  options: Option[]; // array of title, value
  setOption: React.Dispatch<React.SetStateAction<string[]>>;
}

export const MultiSelect: React.FC<SelectProps> = ({
  label,
  option,
  options,
  setOption,
}: SelectProps) => {
  return (
    <div>
      <div className="mt-2">
        <label className="block text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </label>
        <Select
          value={option}
          options={options}
          isMulti={true}
          onChange={(e) => {
            const sel = e.map((i) => i.value);
            setOption(sel);
          }}
        />
      </div>
    </div>
  );
};
