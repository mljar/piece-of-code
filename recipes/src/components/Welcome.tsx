import React, { useState } from "react";
import { IPackage, IRecipeSet } from "../recipes/base";
import { WalkIcon } from "../icons/Walk";
import { IconProps } from "../icons/props";
import { BookIcon } from "../icons/Book";
import { SuccessIcon } from "../icons/Success";
import { WarningIcon } from "../icons/Warning";
import { Tooltip } from "react-tooltip";
import { PackageIcon } from "../icons/Package";
import { ErrorIcon } from "../icons/Error";
import { SpinnerIcon } from "../icons/Spinner";

export interface IWelcomeProps {
  title?: string;
  Icon?: React.FC<IconProps>;
  description: string;
  packages?: IPackage[];
  docsLink?: string;
  checkPackage?: (pkg: string) => void;
  checkedPackages?: Record<string, string>;
  installPackage?: (installationName: string, importName: string) => void;
}

export const Welcome: React.FC<IWelcomeProps> = ({
  title,
  Icon,
  description,
  packages,
  docsLink,
  checkPackage,
  checkedPackages,
  installPackage,
}: IWelcomeProps) => {
  packages?.forEach((p: IPackage) => {
    if (
      checkPackage &&
      checkedPackages &&
      !(p.importName in checkedPackages)
    ) {
      checkPackage(p.importName);
    }
  });
  const packagesList = packages?.map((p: IPackage) => {
    let status = "unknown";
    if (checkedPackages && p.importName in checkedPackages) {
      switch (checkedPackages[p.importName]) {
        case "error":
        case "install":
          status = checkedPackages[p.importName];
          break;
        default:
          status = "available";
          break;
      }
    }

    let tooltipMsg = "Package is available";
    if (status === "error") {
      tooltipMsg = "Package is not available, please install it";
    } else if (status === "install") {
      tooltipMsg = "Package installation, please wait";
    } else if (status === "unknown") {
      tooltipMsg = "Package status is unknown";
    }
    return (
      <div
        className="flex items-center mb-4"
        key={`${p.installationName}${p.version}`}
      >
        <Tooltip id="package-icon-tooltip" className="text-base"/>
        <div
          data-tooltip-id="package-icon-tooltip"
          data-tooltip-content={tooltipMsg}
        >
          {status === "available" && <SuccessIcon className="inline pt-1" />}
          {status === "error" && <ErrorIcon className="inline p-1" />}
          {status === "unknown" && <WarningIcon className="inline pt-1" />}
          {status === "install" && <SpinnerIcon className="inline p-1" />}

          <label className="text-gray-900 dark:text-gray-300">
            {p.installationName}
            {p.version}
          </label>
        </div>
        {status === "error" && (
          <button
            type="button"
            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-2 py-1 text-center mx-2"
            onClick={() => {
              if (installPackage !== undefined) {
                installPackage(p.installationName, p.importName);
              }
            }}
          >
            Install package
          </button>
        )}
        {status === "install" && (
          <label className="text-gray-900 dark:text-gray-300 px-1">
            Please wait, package installation ...
          </label>
        )}
      </div>
    );
  });
  return (
    <div>
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

      {packages && packages.length > 0 && (
        <div>
          <h4 className="text-base text-gray-900 dark:text-white mb-1">
            <PackageIcon className="inline pb-1" /> Required Packages
          </h4>
          {packagesList}
        </div>
      )}
    </div>
  );
};
