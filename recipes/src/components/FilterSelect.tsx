import React from "react";
import { Tooltip } from "react-tooltip";
import { InfoIcon } from "../icons/Info";

interface FilterSelectProps {
  label: string;
  varType: string;
  option: string;
  setOption: React.Dispatch<React.SetStateAction<string>>;
  tooltip?: string;
}

export const FilterSelect: React.FC<FilterSelectProps> = ({
  label,
  varType,
  option,
  setOption,
  tooltip = "",
}: FilterSelectProps) => {
  let options = [];
  if (varType === "numeric") {
    options = ["==", ">=", ">", "<=", "<"];
  } else {
    options = ["==", "contains"];
  }

  console.log(varType, options);

  const optionsElements = options.map((option) => {
    const c = option;
    console.log("option", c);
    return (
      <option value={c} key={`filter-${label}-${c}`}>
        {c}
      </option>
    );
  });

  return (
    <div>
      <div className="poc-mt-2">
        {tooltip !== "" && (
          <Tooltip id="select-widget-tooltip" className="poc-text-base" />
        )}
        <label className="poc-block poc-text-sm poc-font-medium poc-text-gray-900 dark:poc-text-white">
          {label}
          {tooltip !== "" && (
            <div
              data-tooltip-id="select-path-tooltip"
              data-tooltip-content={tooltip}
              className="poc-inline"
            >
              <InfoIcon />
            </div>
          )}
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
