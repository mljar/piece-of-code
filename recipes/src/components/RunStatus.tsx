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
          <SpinnerIcon className="inline" /> {label}
        </div>
      );
    }
    if (status === ExecutionStatus.Success) {
      return (
        <div key={label}>
          <SuccessIcon className="inline" /> {label}
        </div>
      );
    }
    if (status === ExecutionStatus.Error) {
      return (
        <div key={label}>
          <ErrorIcon className="inline" /> {label}
        </div>
      );
    }
    return (
      <div key={label}>
        <WarningIcon className="inline" /> {label}
      </div>
    );
  });

  const allSuccess =
    steps.filter((step) => step[1] === ExecutionStatus.Success).length ==
    steps.length;

  return (
    <div className="text-base text-gray-900 dark:text-white border mb-2 p-2 rounded-md">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-lg font-medium ">
            <BoltIcon className="inline pb-1" />
            Execution status
          </label>
          {elements}
        </div>

        {allSuccess && (
          <div className="col-span-2">
            <p className="py-2 text-base">
              All good 👍
              <button
                type="button"
                className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-1.5 text-center mx-2"
                 onClick={() => addCell()}
              >
                <PlusIcon className="inline pb-1" /> Let's add a new cell
              </button>
            </p>
          </div>
        )}
        {errorName !== "" && (
          <div className="border p-2 border-red-300 rounded-md text-base col-span-2">
            <p className="block text-lg font-medium text-red-600 ">
              Some problems with code ...
            </p>
            <p className="py-2">There was an error during code execution:</p>
            <pre className="border p-2 overflow-auto">
              {errorName}
              <br />
              {errorValue}
            </pre>

            <p className="pt-2">
              Do you need more help?
              {/* 
            <button
              type="button"
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-1.5 text-center my-2"
            >
              <ChatIcon className="inline pb-1" /> Ask on forum
            </button> */}
              <button
                type="button"
                className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-1.5 text-center my-2 mx-2"
                onClick={() => {
                  setShowEmail(true);
                }}
              >
                <MailIcon className="inline pb-1" /> Write email to us
              </button>
            </p>
            {showEmail && (
              <p className="text-base">
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
