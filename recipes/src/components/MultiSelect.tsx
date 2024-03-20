import React, { useState } from "react";
import { MultiSelect as MultiSelectLib } from "react-multi-select-component";

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
      <div className="poc-mt-2">
        <label className="poc-block poc-text-sm poc-font-medium poc-text-gray-900 dark:poc-text-white">
          {label}
        </label>
        <MultiSelectLib
          className="poc-border 
          poc-rounded-md poc-block poc-w-full 
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
          options={options}
          value={option}
          onChange={(e: any[]) => {
            const sel = e.map((i) => i.value);
            setOption(sel);
          }}
          labelledBy="Select"
          hasSelectAll={true}
        />
      </div>
    </div>
  );
};
