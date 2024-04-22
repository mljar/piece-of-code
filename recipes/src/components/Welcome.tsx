import React, { useState } from "react";
import { IPackage, IRecipeSet } from "../recipes/base";
import markdownit from "markdown-it";

import { WalkIcon } from "../icons/Walk";
import { IconProps } from "../icons/props";
import { BookIcon } from "../icons/Book";
import { SuccessIcon } from "../icons/Success";
import { WarningIcon } from "../icons/Warning";
import { Tooltip } from "react-tooltip";
import { PackageIcon } from "../icons/Package";
import { ErrorIcon } from "../icons/Error";
import { SpinnerIcon } from "../icons/Spinner";
import { QuestionIcon } from "../icons/Question";
import { KeyIcon } from "../icons/Key";

const md = markdownit();

// Remember the old renderer if overridden, or proxy to the default renderer.
var defaultRender =
  md.renderer.rules.link_open ||
  function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  // Add a new `target` attribute, or replace the value of the existing one.
  tokens[idx].attrSet("target", "_blank");

  // Pass the token to the default renderer.
  return defaultRender(tokens, idx, options, env, self);
};

export interface IWelcomeProps {
  title?: string;
  Icon?: React.FC<IconProps>;
  description: string;
  packages?: IPackage[];
  docsLink?: string;
  checkPackage?: (pkg: string) => void;
  checkedPackages?: Record<string, string>;
  installPackage?: (installationName: string, importName: string) => void;
  setShowEnterLicense?: React.Dispatch<React.SetStateAction<boolean>>;
  tags?: string[];
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
  setShowEnterLicense,
  tags,
}: IWelcomeProps) => {
  //

  packages?.forEach((p: IPackage) => {
    if (checkPackage && checkedPackages && !(p.importName in checkedPackages)) {
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
        className="poc-flex poc-items-center poc-mb-4"
        key={`${p.installationName}${p.version}`}
      >
        <Tooltip id="package-icon-tooltip" className="poc-text-base" />
        <div
          data-tooltip-id="package-icon-tooltip"
          data-tooltip-content={tooltipMsg}
        >
          {status === "available" && (
            <SuccessIcon className="poc-inline poc-pt-1" />
          )}
          {status === "error" && <ErrorIcon className="poc-inline poc-p-1" />}
          {status === "unknown" && (
            <QuestionIcon className="poc-inline poc-pt-0.5" />
          )}
          {status === "install" && (
            <SpinnerIcon className="poc-inline poc-p-1" />
          )}

          <label className="poc-text-gray-900 dark:poc-text-gray-300">
            {p.installationName}
            {p.version}
          </label>
        </div>
        {status === "error" && (
          <button
            type="button"
            className="poc-text-white poc-bg-gradient-to-r poc-from-cyan-500 poc-to-blue-500 hover:poc-bg-gradient-to-bl focus:poc-ring-4 focus:poc-outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 poc-font-medium poc-rounded-lg poc-text-sm poc-px-2 poc-py-1 poc-text-center poc-mx-2"
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
          <label className="poc-text-gray-900 dark:poc-text-gray-300 poc-px-1">
            Please wait, package installation ...
          </label>
        )}
      </div>
    );
  });

  const tagElements = tags?.map((t) => {
    return (
      <span
        key={`tag-${t}`}
        className="poc-bg-blue-100 poc-text-blue-800 poc-text-xs poc-font-medium poc-me-2 poc-px-2.5 poc-py-0.5 poc-rounded dark:poc-bg-blue-900 dark:poc-text-blue-300"
      >
        {t}
      </span>
    );
  });

  return (
    <div>
      <h3 className="poc-text-lg   poc-text-gray-900 dark:poc-text-white poc-mb-2 poc-font-medium">
        {Icon && <Icon className="poc-inline poc-pb-1" />} {title && title}
        {docsLink && (
          <div className="poc-inline poc-items-center poc-float-right">
            <a
              className="poc-text-blue-500 hover:poc-text-blue-700 
          poc-font-medium poc-text-sm poc-text-center 
          poc-inline-flex poc-items-center dark:poc-bg-blue-600 
          dark:hover:poc-bg-blue-700 dark:focus:poc-ring-blue-800"
              href={docsLink}
              target="_blank"
            >
              <BookIcon className="poc-p-0.5" />
              <span>Docs</span>
              <span className="poc-sr-only">Documentation</span>
            </a>
          </div>
        )}
      </h3>
      {/* {description && <p className="poc-mb-2 poc-text-base">{description}</p>} */}
      {description && (
        <div
          className="poc-prose poc-max-w-none"
          dangerouslySetInnerHTML={{
            __html: md.render(description),
          }}
        ></div>
      )}

      {packages && packages.length > 0 && (
        <div>
          <h4 className="poc-text-base poc-text-gray-900 dark:poc-text-white poc-mb-1 poc-font-medium">
            <PackageIcon className="poc-inline poc-pb-1" /> Required Packages
          </h4>
          {packagesList}
        </div>
      )}
      {setShowEnterLicense !== undefined && (
        <div className="poc-pt-2">
          <a
            type="button"
            className="poc-text-white poc-bg-gradient-to-r poc-from-green-400 poc-via-green-500 poc-to-green-600 hover:poc-bg-gradient-to-br focus:poc-ring-4 focus:poc-outline-none focus:poc-ring-green-300 dark:focus:poc-ring-green-800 poc-font-medium poc-rounded-lg poc-text-sm poc-px-5 poc-py-2 poc-text-center"
            onClick={() => {
              setShowEnterLicense(true);
            }}
          >
            <KeyIcon className="poc-inline poc-pb-1" /> Enter license
          </a>
        </div>
      )}
      {tagElements && <div>{tagElements}</div>}
    </div>
  );
};
