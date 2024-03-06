import React, { useEffect, useState } from "react";
import { FileCsvIcon } from "../icons/FileCsv";
import { BookIcon } from "../icons/Book";
import { IconProps } from "../icons/props";

interface SelectPathProps {
  label: string;
  additionalInfo?: string;
  setPath?: React.Dispatch<React.SetStateAction<string>>;
  selectFolder?: boolean;
  defaultPath?: string;
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
}: SelectPathProps) => {
  const [folderPath, setFolderPath] = useState("");
  const [filePathElectron, setFilePathElectron] = useState("");
  let isElectron = false;
  if (window.electronAPI !== undefined && window.electronAPI !== null) {
    isElectron = true;
  }

  useEffect(() => {
    if(defaultPath) {
      setFolderPath(defaultPath);
      setFilePathElectron(defaultPath);
    }
  }, [defaultPath])

  return (
    <div className="mt-2">
      <label className="block text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>

      {isElectron && (
        <div
          className="block w-full text-gray-900 
        border border-gray-300 rounded-md cursor-pointer bg-gray-50 
        dark:text-gray-400 focus:outline-none focus:border focus:border-blue-500 dark:bg-gray-700 
        dark:border-gray-600 dark:placeholder-gray-400 p-0.5 "
        >
          <button
            type="button"
            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 
          focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-md text-sm px-2 py-1 text-center my-0.5 mx-0.5 mr-2"
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
          className="block w-full text-gray-900 
        border border-gray-300 rounded-md cursor-pointer bg-gray-50 
        dark:text-gray-400 focus:outline-none focus:border focus:border-blue-500 dark:bg-gray-700 
        dark:border-gray-600 dark:placeholder-gray-400 p-0.5 text-base
        
            file:outline-none  file:border-none
            file:text-white file:bg-gradient-to-r file:from-cyan-500 file:to-blue-500 file:hover:bg-gradient-to-bl file:focus:ring-4 
            file:focus:outline-none file:focus:ring-cyan-300 file:dark:focus:ring-cyan-800 file:font-medium file:rounded-md 
            file:text-sm file:px-2 file:py-1 file:text-center
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
          className="bg-gray-50 border border-gray-300 text-gray-900 
        rounded-md 
        focus:border-blue-500 block w-full p-1.5 
        focus:border
        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
        dark:text-white dark:focus:border-blue-400
     text-md outline-0"
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
          className="mt-1 text-sm text-gray-500 dark:text-gray-300"
          id="file_input_help"
        >
          additionalInfo
        </p>
      )}
    </div>
  );
};
