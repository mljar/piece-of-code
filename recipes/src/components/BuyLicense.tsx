import React, { useState } from "react";
import { LicenseIcon } from "../icons/License";
import { DesktopIcon } from "../icons/Desktop";
import { XIcon } from "../icons/X";
import { KeyIcon } from "../icons/Key";

export interface IBuyLicenseProps {
  setShowBuyLicense: React.Dispatch<React.SetStateAction<boolean>>;
  setShowEnterLicense: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BuyLicense: React.FC<IBuyLicenseProps> = ({
  setShowBuyLicense,
  setShowEnterLicense,
}: IBuyLicenseProps) => {
  return (
    <div className="poc-text-base poc-text-gray-900 dark:poc-text-white poc-pl-2 poc-bg-blue-100 poc-rounded-lg poc-pb-2 poc-mb-2">
      <div>
        <h3 className="poc-text-lg poc-text-blue-700 poc-pt-2 poc-font-medium">
          <DesktopIcon className="poc-inline poc-pb-1" />
          You are using free version of MLJAR Studio
        </h3>
        <p className="poc-text-base poc-text-blue-700 ">
          Please purchase Pro license to make this message disappear forever. In
          free version, it will show up from time to time.
        </p>
        <div className="poc-pt-1">
          <a
            type="button"
            className="poc-text-white poc-bg-gradient-to-r poc-from-green-400 poc-via-green-500 poc-to-green-600 hover:poc-bg-gradient-to-br focus:poc-ring-4 focus:poc-outline-none focus:poc-ring-green-300 dark:focus:poc-ring-green-800 poc-font-medium poc-rounded-lg poc-text-sm poc-px-5 poc-py-2 poc-text-center "
            href="https://mljar.com/pricing/"
            target="_blank"
          >
            <LicenseIcon className="poc-inline poc-pb-1" /> Buy license
          </a>
          <a
            type="button"
            className="poc-text-white poc-bg-gradient-to-r poc-from-cyan-400 poc-via-cyan-500 poc-to-cyan-600 hover:poc-bg-gradient-to-br focus:poc-ring-4 focus:poc-outline-none focus:poc-ring-cyan-300 dark:focus:poc-ring-cyan-800 poc-font-medium poc-rounded-lg poc-text-sm poc-px-5 poc-py-2 poc-text-center poc-mx-1"
            onClick={() => {
              setShowEnterLicense(true);
            }}
          >
            <KeyIcon className="poc-inline poc-pb-1" /> Enter license
          </a>
          <a
            type="button"
            className="poc-text-white poc-bg-gradient-to-r poc-from-pink-400 poc-via-pink-500 poc-to-pink-600 hover:poc-bg-gradient-to-br focus:poc-ring-4 focus:poc-outline-none focus:poc-ring-pink-300 dark:focus:poc-ring-pink-800 poc-font-medium poc-rounded-lg poc-text-sm poc-px-5 poc-py-2 poc-text-center "
            onClick={() => {
              setShowBuyLicense(false);
            }}
          >
            <XIcon className="poc-inline poc-pb-1" /> Close this message
          </a>
        </div>
      </div>
    </div>
  );
};

export default BuyLicense;
