import React, { useState } from "react";
import { SpinnerIcon } from "../icons/Spinner";
import { SuccessIcon } from "../icons/Success";
import { ErrorIcon } from "../icons/Error";
import { WarningIcon } from "../icons/Warning";
import { PlusIcon } from "../icons/Plus";
import { BoltIcon } from "../icons/Bolt";
import { ChatIcon } from "../icons/Chat";
import { MailIcon } from "../icons/Mail";
import ExecutionStatus from "./ExecutionStatus";

// export enum ExecutionStatus {
//   Wait = "Wait",
//   Success = "Success",
//   Error = "Error",
//   Warning = "Warning",
// }

export interface IRunStatusProps {
  steps: [string, ExecutionStatus][];
  errorName: string;
  errorValue: string;
  addCell: () => void;
}

export const RunStatus: React.FC<IRunStatusProps> = ({
  steps,
  errorName,
  errorValue,
  addCell,
}: IRunStatusProps) => {
  const [showEmail, setShowEmail] = useState(false);
  const elements = steps.map((step) => {
    const label = step[0];
    const status = step[1];
    if (status === ExecutionStatus.Wait) {
      return (
        <div key={label}>
          <SpinnerIcon className="poc-inline" /> {label}
        </div>
      );
    }
    if (status === ExecutionStatus.Success) {
      return (
        <div key={label}>
          <SuccessIcon className="poc-inline" /> {label}
        </div>
      );
    }
    if (status === ExecutionStatus.Error) {
      return (
        <div key={label}>
          <ErrorIcon className="poc-inline" /> {label}
        </div>
      );
    }
    return (
      <div key={label}>
        <WarningIcon className="poc-inline" /> {label}
      </div>
    );
  });

  const allSuccess =
    steps.filter((step) => step[1] === ExecutionStatus.Success).length ==
    steps.length;

  return (
    <div className="poc-text-base poc-text-gray-900 dark:poc-text-white poc-pl-2">
      <div className="poc-grid poc-grid-cols-3 poc-gap-4">
        <div>
          <label className="poc-block poc-text-lg poc-font-medium ">
            <BoltIcon className="poc-inline poc-pb-1" />
            Execution status
          </label>
          {elements}
        </div>

        {allSuccess && (
          <div className="poc-col-span-2">
            <p className="poc-py-2 poc-text-base">
              All good 👍
              <button
                type="button"
                className="poc-text-white poc-bg-gradient-to-r poc-from-cyan-500 poc-to-blue-500 hover:poc-bg-gradient-to-bl focus:poc-ring-4 focus:poc-outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 poc-font-medium poc-rounded-lg poc-text-sm poc-px-5 poc-py-1.5 poc-text-center poc-mx-2"
                 onClick={() => addCell()}
              >
                <PlusIcon className="poc-inline poc-pb-1" /> Let's add a new cell
              </button>
            </p>
          </div>
        )}
        {errorName !== "" && (
          <div className="poc-border poc-p-2 poc-border-red-300 poc-rounded-md poc-text-base poc-col-span-2">
            <p className="poc-block poc-text-lg poc-font-medium poc-text-red-600 ">
              Some problems with code ...
            </p>
            <p className="poc-py-2">There was an error during code execution:</p>
            <pre className="poc-border poc-p-2 poc-overflow-auto">
              {errorName}
              <br />
              {errorValue}
            </pre>

            <p className="poc-pt-2">
              Do you need more help?
              {/* 
            <button
              type="button"
              className="poc-text-white poc-bg-gradient-to-r poc-from-green-400 poc-via-green-500 poc-to-green-600 hover:poc-bg-gradient-to-br focus:poc-ring-4 focus:poc-outline-none focus:poc-ring-green-300 dark:focus:poc-ring-green-800 poc-font-medium poc-rounded-lg poc-text-sm poc-px-5 poc-py-1.5 poc-text-center poc-my-2"
            >
              <ChatIcon className="poc-inline poc-pb-1" /> Ask on forum
            </button> */}
              <button
                type="button"
                className="poc-text-white poc-bg-gradient-to-r poc-from-cyan-400 poc-via-cyan-500 poc-to-cyan-600 hover:poc-bg-gradient-to-br focus:poc-ring-4 focus:poc-outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 poc-font-medium poc-rounded-lg poc-text-sm poc-px-5 poc-py-1.5 poc-text-center poc-my-2 poc-mx-2"
                onClick={() => {
                  setShowEmail(true);
                }}
              >
                <MailIcon className="poc-inline poc-pb-1" /> Write email to us
              </button>
            </p>
            {showEmail && (
              <p className="poc-text-base">
                Our email address is <b>contact@mljar.com</b> please include the
                error message and describe your use case.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RunStatus;
