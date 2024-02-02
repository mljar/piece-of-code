// MyComponent.tsx
// import { IconFileTypeCsv, TablerIconsProps } from "@tabler/icons-react";
import React from "react";
import { FileCsvIcon } from "../icons/FileCsv";
import { IconProps } from "../icons/props";

interface TitleProps {
  title: string;
  Icon?: React.FC<IconProps>;
}

export const Title: React.FC<TitleProps> = ({ title, Icon }: TitleProps) => {
  return (
    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
      {Icon && <Icon className="inline pb-1" />}
      {title}
      {/* <button
          type="button"
          className="text-blue-500 hover:text-blue-700 font-medium rounded-lg text-sm text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <IconInfoCircle className="pt-1" />
          <span className="sr-only">Icon description</span>
        </button> */}
    </h3>
  );
};
