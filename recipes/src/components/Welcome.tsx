import React, { useState } from "react";
import { IRecipeSet } from "../recipes/base";
import { WalkIcon } from "../icons/Walk";
import { IconProps } from "../icons/props";
import { BookIcon } from "../icons/Book";

export interface IWelcomeProps {
  title?: string;
  Icon?: React.FC<IconProps>;
  description: string;
  packages?: [string, string][];
  docsLink?: string;
}

export const Welcome: React.FC<IWelcomeProps> = ({
  title,
  Icon,
  description,
  packages,
  docsLink,
}: IWelcomeProps) => {
  const packagesList = packages?.map((p: [string, string]) => (
    <div className="flex items-center mb-4">
      <input
        type="checkbox"
        value="1"
        className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
        checked
      />
      <label className="ms-1 text-gray-900 dark:text-gray-300">
        {p[0]}
        {p[1]}
      </label>
    </div>
  ));
  return (
    <>
      <h3 className="text-lg   text-gray-900 dark:text-white mb-2">
        {Icon && <Icon className="inline pb-1" />} {title && title}
        {docsLink && (
          <div className="inline items-center float-right">
            <a
              className="text-blue-500 hover:text-blue-700 
          font-medium text-sm text-center 
          inline-flex items-center dark:bg-blue-600 
          dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              href={docsLink}
              target="_blank"
            >
              <BookIcon className="p-0.5" />
              <span>Docs</span>
              <span className="sr-only">Documentation</span>
            </a>
          </div>
        )}
        
      </h3>
      {description && <p className="mb-2 text-base">{description}</p>}

      {packages && (
        <div>
          <h4 className="text-md text-gray-900 dark:text-white mb-1">
            Required Packages
          </h4>
          {packagesList}
        </div>
      )}
    </>
  );
};
