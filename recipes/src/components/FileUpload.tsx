import React from "react";
import { FileCsvIcon } from "../icons/FileCsv";
import { BookIcon } from "../icons/Book";
import { IconProps } from "../icons/props";

interface FileUploadProps {
  title: string;
  Icon?: React.FC<IconProps>;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  title,
  Icon,
}: FileUploadProps) => {
  return (
    <div className="mt-2">
      <label className="block text-sm font-medium text-gray-900 dark:text-white">
        Upload file
      </label>
      <input
        className="block w-full text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 p-0.5 text-md"
        id="file_input"
        type="file"
      ></input>
      <p
        className="mt-1 text-sm text-gray-500 dark:text-gray-300"
        id="file_input_help"
      >
        Upload *.csv file
      </p>
    </div>
  );
};
