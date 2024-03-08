import React from "react";
import { IconProps } from "../icons/props";

interface TitleProps {
  label: string;
  Icon?: React.FC<IconProps>;
  advanced?: boolean;
  setAdvanced?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Title: React.FC<TitleProps> = ({
  label,
  Icon,
  advanced,
  setAdvanced,
}: TitleProps) => {
  return (
    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
      {Icon && <Icon className="inline pb-1" />}
      {label}
      {/* <div className="inline items-center float-right">
        <a
          className="text-blue-500 hover:text-blue-700 
          font-medium text-sm text-center 
          inline-flex items-center dark:bg-blue-600 
          dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          href=""
        >
          <BookIcon className="" /> <span className="pb-0.5">Docs</span>
          <span className="sr-only">Docs</span>
        </a>
      </div> */}
      {setAdvanced && (
        <div className="inline items-center float-right px-2">
          <label
            className="relative inline-flex 
                          items-center cursor-pointer"
          >
            <input
              type="checkbox"
              checked={advanced}
              className="sr-only peer"
              onChange={(e) => {
                setAdvanced(!advanced);
              }}
            />
            <div
              className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                        peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 
                        rounded-full peer dark:bg-gray-700 
                        peer-checked:after:translate-x-full 
                        rtl:peer-checked:after:-translate-x-full 
                        peer-checked:after:border-white after:content-[''] 
                        after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
            ></div>
            <span className="ms-1 text-xs font-normal text-gray-900 dark:text-gray-300">
              Advanced
            </span>
          </label>
        </div>
      )}
    </h3>
  );
};
