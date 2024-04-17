import React, { useEffect, useState } from "react";
import { SpinnerIcon } from "../icons/Spinner";
import { SuccessIcon } from "../icons/Success";
import { ErrorIcon } from "../icons/Error";
import { WarningIcon } from "../icons/Warning";
import { PlusIcon } from "../icons/Plus";
import { BoltIcon } from "../icons/Bolt";
import { ChatIcon } from "../icons/Chat";
import { MailIcon } from "../icons/Mail";
import ExecutionStatus from "./ExecutionStatus";
import { LicenseIcon } from "../icons/License";
import { DesktopIcon } from "../icons/Desktop";
import { XIcon } from "../icons/X";
import { KeyIcon } from "../icons/Key";

export interface IEnterLicenseProps {
  setShowEnterLicense: React.Dispatch<React.SetStateAction<boolean>>;
}

declare global {
  interface Window {
    electronAPI: any;
  }
}

export const EnterLicense: React.FC<IEnterLicenseProps> = ({
  setShowEnterLicense,
}: IEnterLicenseProps) => {
  const [license, setLicense] = useState("");
  const [checkState, setCheckState] = useState("unknown"); // "unknown" | "loading" | "valid" | "invalid" | "error"

  let isElectron = false;
  if (typeof window !== "undefined") {
    if (window.electronAPI !== undefined && window.electronAPI !== null) {
      isElectron = true;
    }
  }

  useEffect(() => {
    async function getLicense() {
      if (isElectron) {
        const savedLicense = await window.electronAPI.getLicense();
        if (savedLicense !== "") {
          setLicense(savedLicense);
          setCheckState("valid");
        }
      }
    }
    getLicense();
  }, []);

  return (
    <div className="poc-text-base poc-text-gray-900 dark:poc-text-white poc-pl-2 poc-bg-gray-50 poc-rounded-lg poc-pb-2 poc-mb-2">
      <div>
        <h3 className="poc-text-lg poc-pt-2 poc-font-medium">
          <KeyIcon className="poc-inline poc-pb-1" />
          Enter license
        </h3>
        <p className="poc-text-base ">Please enter Pro license.</p>
        <div className="poc-mr-2 poc-py-1">
          <input
            type="text"
            className="poc-bg-gray-50 poc-border poc-border-gray-300 poc-text-gray-900 
        poc-rounded-md 
        focus:poc-border-blue-500 poc-block poc-w-full poc-p-1.5 
        focus:poc-border
        dark:poc-bg-gray-700 dark:poc-border-gray-600 dark:poc-placeholder-gray-400 
        dark:poc-text-white dark:focus:poc-border-blue-400
        poc-outline-0 "
            placeholder={"License API key"}
            value={license}
            onChange={(e) => setLicense(e.target.value)}
          />
        </div>

        <div>
          {checkState === "valid" && (
            <>
              <SuccessIcon className="poc-inline" /> License successfully
              validated.
            </>
          )}
          {checkState === "invalid" && (
            <>
              <ErrorIcon className="poc-inline" /> License invalid.
            </>
          )}
          {checkState === "error" && (
            <>
              <ErrorIcon className="poc-inline" /> Error during license
              validation.
            </>
          )}
          {checkState === "loading" && (
            <>
              <SpinnerIcon className="poc-inline poc-p-1" /> License validation,
              please wait ...
            </>
          )}
        </div>

        <div className="poc-pt-1">
          <button
            type="button"
            className="poc-text-white poc-bg-gradient-to-r poc-from-cyan-400 poc-via-cyan-500 poc-to-cyan-600 hover:poc-bg-gradient-to-br focus:poc-ring-4 focus:poc-outline-none focus:poc-ring-cyan-300 dark:focus:poc-ring-cyan-800 poc-font-medium poc-rounded-lg poc-text-sm poc-px-5 poc-py-1.5 poc-text-center "
            onClick={async () => {
              try {
                if (isElectron) {
                  setCheckState("loading");
                  const isPro =
                    await window.electronAPI.validateLicense(license);
                  if (isPro) {
                    setCheckState("valid");
                  } else {
                    setCheckState("invalid");
                  }
                }
              } catch (error) {
                setCheckState("error");
              }
            }}
          >
            OK
          </button>
          <button
            type="button"
            className="poc-text-white poc-bg-gradient-to-r poc-from-pink-400 poc-via-pink-500 poc-to-pink-600 hover:poc-bg-gradient-to-br focus:poc-ring-4 focus:poc-outline-none focus:poc-ring-pink-300 dark:focus:poc-ring-pink-800 poc-font-medium poc-rounded-lg poc-text-sm poc-px-5 poc-py-1.5 poc-text-center poc-mx-1"
            onClick={() => {
              setShowEnterLicense(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnterLicense;
