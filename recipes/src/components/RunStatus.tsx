import React, { useState } from "react";
import { SpinnerIcon } from "../icons/Spinner";
import { SuccessIcon } from "../icons/Success";
import { ErrorIcon } from "../icons/Error";
import { WarningIcon } from "../icons/Warning";
import { PlusIcon } from "../icons/Plus";
import { BoltIcon } from "../icons/Bolt";

export enum ExecutionStatus {
  Wait = "Wait",
  Success = "Success",
  Error = "Error",
  Warning = "Warning",
}

export interface IRunStatusProps {
  label: string;
  steps: [string, ExecutionStatus][];
}

export const RunStatus: React.FC<IRunStatusProps> = ({
  label,
  steps,
}: IRunStatusProps) => {
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
    <div className="text-base text-gray-900 dark:text-white border-2 mb-2 p-2 rounded-md">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-lg font-medium "><BoltIcon className="inline pb-1"/>{label}</label>
          {elements}
        </div>

        {allSuccess && (
          <div>
            <p className="py-2 text-base">
              Congratulations, your code is working! 👍
            </p>
            <button
              type="button"
              className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-1.5 text-center"
              // onClick={() => setShowNav(!showNav)}
            >
              <PlusIcon className="inline pb-1" /> Let's add a new cell
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RunStatus;
