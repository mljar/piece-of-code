import React, { useEffect, useState } from "react";
import { InfoIcon } from "../icons/Info";
import { Tooltip } from "react-tooltip";

interface SelectPathProps {
  label: string;
  additionalInfo?: string;
  setPath?: React.Dispatch<React.SetStateAction<string>>;
  selectFolder?: boolean;
  defaultPath?: string;
  tooltip?: string;
}

declare global {
  interface Window {
    electronAPI: any;
  }
}

export const SelectPath: React.FC<SelectPathProps> = ({
  label,
  additionalInfo,
  setPath,
  selectFolder = false,
  defaultPath,
  tooltip = "",
}: SelectPathProps) => {
  const [folderPath, setFolderPath] = useState("");
  const [filePathElectron, setFilePathElectron] = useState("");
  let isElectron = false;
  if (typeof window !== "undefined") {
    if (window.electronAPI !== undefined && window.electronAPI !== null) {
      isElectron = true;
    }
  }

  useEffect(() => {
    if (defaultPath) {
      setFolderPath(defaultPath);
      setFilePathElectron(defaultPath);
    }
  }, [defaultPath]);

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
            className="poc-inline poc-absolute"
          >
            <InfoIcon />
          </div>
        )}
      </label>

      {isElectron && (
        <div
          className="poc-block poc-w-full poc-text-gray-900 
        poc-border poc-border-gray-300 poc-rounded-md poc-cursor-pointer poc-bg-gray-50 
        dark:poc-text-gray-400 focus:poc-outline-none focus:poc-border focus:poc-border-blue-500 dark:poc-bg-gray-700 
        dark:poc-border-gray-600 dark:poc-placeholder-gray-400 poc-p-0.5 "
        >
          <button
            type="button"
            className="poc-text-white poc-bg-gradient-to-r poc-from-cyan-500 poc-to-blue-500 hover:poc-bg-gradient-to-bl focus:poc-ring-4 
          focus:poc-outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 poc-font-medium poc-rounded-md poc-text-sm poc-px-2 poc-py-1 poc-text-center poc-my-0.5 poc-mx-0.5 poc-mr-2"
            onClick={async () => {
              const filePath = selectFolder
                ? await window.electronAPI.recipeOpenFolder()
                : await window.electronAPI.recipeOpenFile();

              setFilePathElectron(filePath);
              if (setPath) {
                setPath(filePath);
              }
            }}
          >
            {selectFolder ? "Choose folder" : "Choose file"}
          </button>
          <span>{filePathElectron ? filePathElectron : "Please choose"}</span>
        </div>
      )}

      {!isElectron && !selectFolder && (
        <input
          className="poc-block poc-w-full poc-text-gray-900 
        poc-border poc-border-gray-300 poc-rounded-md poc-cursor-pointer poc-bg-gray-50 
        dark:poc-text-gray-400 focus:poc-outline-none focus:poc-border focus:poc-border-blue-500 dark:poc-bg-gray-700 
        dark:poc-border-gray-600 dark:poc-placeholder-gray-400 poc-p-0.5 poc-text-base
        
            file:poc-outline-none  file:poc-border-none
            file:poc-text-white file:poc-bg-gradient-to-r file:poc-from-cyan-500 file:poc-to-blue-500 file:hover:poc-bg-gradient-to-bl file:focus:poc-ring-4 
            file:focus:poc-outline-none file:focus:ring-cyan-300 file:dark:focus:ring-cyan-800 file:poc-font-medium file:poc-rounded-md 
            file:poc-text-sm file:poc-px-2 file:poc-py-1 file:poc-text-center
        "
          type="file"
          multiple={false}
          onChange={(e) => {
            if (e.target.files && setPath) {
              setPath(e.target.files[0].name);
            }
          }}
        ></input>
      )}

      {!isElectron && selectFolder && (
        <input
          type="text"
          className="poc-bg-gray-50 poc-border poc-border-gray-300 poc-text-gray-900 
        poc-rounded-md 
        focus:poc-border-blue-500 poc-block poc-w-full poc-p-1.5 
        focus:poc-border
        poc-outline-0
        dark:poc-bg-gray-700 dark:poc-border-gray-600 dark:poc-placeholder-gray-400 
        dark:poc-text-white dark:focus:poc-border-blue-400"
          placeholder={"Please provide path"}
          value={folderPath}
          onChange={(e) => {
            setFolderPath(e.target.value);
            if (setPath) {
              setPath(e.target.value);
            }
          }}
        />
      )}

      {additionalInfo && (
        <p
          className="poc-mt-1 poc-text-sm poc-text-gray-500 dark:poc-text-gray-300"
          id="file_input_help"
        >
          additionalInfo
        </p>
      )}
    </div>
  );
};
