import React from "react";
import { InfoIcon } from "../icons/Info";
import { Tooltip } from "react-tooltip";

interface ToggleProps {
  label: string;
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
  tooltip?: string;
  paddingTop?: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({
  label,
  value,
  setValue,
  tooltip = "",
  paddingTop = true,
}: ToggleProps) => {
  return (
    <div className="poc-mt-2">
      {tooltip !== "" && (
        <Tooltip id="select-path-tooltip" className="poc-text-base" />
      )}
      {paddingTop && (
        <div className="poc-pb-7"></div>
      )}
      {!paddingTop && (
        <div className="poc-pb-2"></div>
      )}
      <label
        className="poc-relative poc-inline-flex 
                          poc-items-center poc-cursor-pointer"
      >
        <input
          type="checkbox"
          checked={value}
          className="poc-sr-only poc-peer"
          onChange={(e) => {
            setValue(!value);
          }}
          aria-label={`Checkbox for ${label}`}
        />
        <div
          className="poc-w-9 poc-h-5 poc-bg-gray-200 peer-focus:poc-outline-none   peer-focus:poc-ring-4 
                        peer-focus:poc-ring-blue-300 dark:peer-focus:poc-ring-blue-800 
                        poc-rounded-full peer dark:poc-bg-gray-700 
                        peer-checked:after:poc-translate-x-full 
                        peer-checked:after:poc-border-white after:poc-content-[''] 
                        after:poc-absolute after:poc-top-[2px] after:poc-start-[2px] after:poc-bg-white after:poc-border-gray-300 after:poc-border after:poc-rounded-full after:poc-h-4 after:poc-w-4 after:poc-transition-all dark:poc-border-gray-600 peer-checked:poc-bg-blue-600"
        ></div>
        <span className="poc-ms-1 poc-text-sm poc-font-medium poc-text-gray-900 dark:poc-text-gray-300">
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
        </span>
      </label>
    </div>
  );
};
