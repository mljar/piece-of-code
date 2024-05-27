import React from "react";
import { Tooltip } from "react-tooltip";
import { InfoIcon } from "../icons/Info";

interface VariableProps {
  label: string;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  tooltip?: string;
}

export const Variable: React.FC<VariableProps> = ({
  label,
  name,
  setName,
  tooltip = "",
}: VariableProps) => {
  return (
    <div>
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
              className="poc-inline "
            >
              <InfoIcon className="poc-absolute" />
            </div>
          )}
          <input
            type="text"
            className="poc-bg-gray-50 poc-border poc-border-gray-300 poc-text-gray-900 
        poc-rounded-md 
        focus:poc-border-blue-500 poc-block poc-w-full poc-p-2
        focus:poc-border
        poc-outline-0
        dark:poc-bg-gray-700 dark:poc-border-gray-600 dark:poc-placeholder-gray-400 
        dark:poc-text-white dark:focus:poc-border-blue-400"
            placeholder={name}
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-label={`${label}`}
          />
        </label>
      </div>
    </div>
  );
};
