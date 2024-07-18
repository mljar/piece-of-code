import React from "react";
import { Tooltip } from "react-tooltip";
import { InfoIcon } from "../icons/Info";

interface TextAreaProps {
    label: string;
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
    tooltip?: string;
    rows?: number;
}

export const TextArea: React.FC<TextAreaProps> = ({
    label,
    text,
    setText,
    tooltip = "",
    rows = 3,
}: TextAreaProps) => {
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
                    <textarea
                        className="poc-bg-gray-50 poc-border poc-border-gray-300 poc-text-gray-900 
        poc-rounded-md 
        focus:poc-border-blue-500 poc-block poc-w-full poc-p-2
        focus:poc-border
        poc-outline-0
        dark:poc-bg-gray-700 dark:poc-border-gray-600 dark:poc-placeholder-gray-400 
        dark:poc-text-white dark:focus:poc-border-blue-400"
                        placeholder={text}
                        value={text}
                        rows={rows}
                        onChange={(e) => setText(e.target.value)}
                        aria-label={`${label}`}
                    />
                </label>
            </div>
        </div>
    );
};
