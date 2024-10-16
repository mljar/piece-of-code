import React from "react";
import { IconProps } from "../icons/props";
import { BookIcon } from "../icons/Book";
import { ExternalLinkIcon } from "../icons/ExternalLink";

interface TitleProps {
  label: string;
  Icon?: React.FC<IconProps>;
  advanced?: boolean;
  setAdvanced?: React.Dispatch<React.SetStateAction<boolean>>;
  docsUrl?: string;
  hideTitle?: boolean;
}

export const Title: React.FC<TitleProps> = ({
  label,
  Icon,
  advanced,
  setAdvanced,
  docsUrl,
  hideTitle,
}: TitleProps) => {
  const cl = `poc-text-lg poc-font-medium poc-text-gray-900 dark:poc-text-white poc-pb-1 ${hideTitle !== undefined && hideTitle? "poc-relative poc-right-2 poc-top-0" : ""}`;
  return (
    <h2 className={cl}>
      {!hideTitle && (
        <>
          {Icon && <Icon className="poc-inline poc-pb-1" />}
          {label}
        </>
      )}

      {setAdvanced && (
        <div className="poc-inline poc-items-center poc-float-right poc-px-2 poc-pt-1">
          <label
            className="poc-relative poc-inline-flex 
                          poc-items-center poc-cursor-pointer"
          >
            <input
              type="checkbox"
              checked={advanced}
              className="poc-sr-only poc-peer"
              onChange={(e) => {
                setAdvanced(!advanced);
              }}
            />
            <div
              className="poc-w-9 poc-h-5 poc-bg-gray-200 peer-focus:poc-outline-none   peer-focus:poc-ring-4 
                        peer-focus:poc-ring-blue-300 dark:peer-focus:poc-ring-blue-800 
                        poc-rounded-full peer dark:poc-bg-gray-700 
                        peer-checked:after:poc-translate-x-full 
                        

                        peer-checked:after:poc-border-white after:poc-content-[''] 
                        after:poc-absolute after:poc-top-[2px] after:poc-start-[2px] after:poc-bg-white after:poc-border-gray-300 after:poc-border after:poc-rounded-full after:poc-h-4 after:poc-w-4 after:poc-transition-all dark:poc-border-gray-600 peer-checked:poc-bg-blue-600"
            ></div>
            <span className="poc-ms-1 poc-text-xs poc-font-medium poc-text-gray-900 dark:poc-text-gray-300">
              Advanced
            </span>
          </label>
        </div>
      )}
      {/* {docsUrl && (
        <div className="poc-relative poc-float-right">
          <a
            className="poc-text-blue-700 hover:poc-text-blue-800 
          poc-font-medium poc-text-sm poc-text-center 
          poc-inline-flex poc-items-center dark:poc-text-white 
          dark:hover:poc-text-blue-100 dark:focus:poc-ring-blue-800
          "
            href={docsUrl}
          >
            {" "}
            Docs
            <ExternalLinkIcon className="poc-pb-1" />
          </a>
        </div>
      )} */}
    </h2>
  );
};
