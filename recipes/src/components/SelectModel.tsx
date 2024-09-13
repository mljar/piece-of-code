import React from "react";
import { Tooltip } from "react-tooltip";
import { InfoIcon } from "../icons/Info";

interface SelectModelProps {
  label: string;
  option: string; // selected value
  options: [string, string][]; // array of title, value
  setOption: React.Dispatch<React.SetStateAction<string>>;
  tooltip?: string;
}

export const SelectModel: React.FC<SelectModelProps> = ({
  label,
  option,
  options,
  setOption,
  tooltip = "",
}: SelectModelProps) => {
  const optionsElements = options.map((option) => {
    const label = option[0];
    const value = option[1];
    return (
      <option value={value} key={`${value}`}>
        {label}
      </option>
    );
  });

  return (
    <div>
      <div>
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
              <InfoIcon className="poc-absolute" />
            </div>
          )}

          <select
            value={option}
            onChange={(e) => setOption(e.target.value)}
            className="poc-border-2 poc-border-gray-300
          poc-p-1
          poc-block
          poc-w-full
          poc-bg-white
          poc-text-gray-900
          focus:poc-border focus:poc-border-blue-500
          dark:poc-bg-gray-700 dark:poc-border-gray-600
          dark:poc-placeholder-gray-400
          dark:poc-text-white
          poc-outline-none
          "
            aria-label={`Select input for ${label}`}
          >
            {optionsElements}
          </select>
        </label>
      </div>
    </div>
  );
};
