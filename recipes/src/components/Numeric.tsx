import React from "react";
import { Tooltip } from "react-tooltip";
import { InfoIcon } from "../icons/Info";

interface NumericProps {
  label: string;
  name: number;
  setName: React.Dispatch<React.SetStateAction<number>>;
  tooltip?: string;
}

export const Numeric: React.FC<NumericProps> = ({
  label,
  name,
  setName,
  tooltip,
}: NumericProps) => {
  return (
    <div className="poc-mt-2">
      {tooltip !== "" && (
        <Tooltip id="select-path-tooltip" className="poc-text-base" />
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
      <input
        type="number"
        className="poc-bg-gray-50 poc-border poc-border-gray-300 poc-text-gray-900 
        poc-rounded-md 
        focus:poc-border-blue-500 poc-block poc-w-full poc-p-1.5 
        focus:poc-border
        dark:poc-bg-gray-700 dark:poc-border-gray-600 dark:poc-placeholder-gray-400 
        dark:poc-text-white dark:focus:poc-border-blue-400
        poc-outline-0"
        value={name}
        onChange={(e) => setName(parseInt(e.target.value))}
      />
    </div>
  );
};
