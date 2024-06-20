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
import { WandIcon } from "../icons/Wand";
import { Chat } from "./Chat";
import IVariable from "./IVariable";

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
  //
  variablesStatus: "loading" | "loaded" | "error" | "unknown";
  variables: IVariable[];
  setCode: (src: string) => void;
  metadata: any;
  setMetadata: (m: any) => void;
  previousCode: string;
  showBorder: boolean;
}

export const RunStatus: React.FC<IRunStatusProps> = ({
  steps,
  errorName,
  errorValue,
  addCell,
  variablesStatus,
  variables,
  setCode,
  metadata,
  setMetadata,
  previousCode,
  showBorder,
}: IRunStatusProps) => {

  const [showEmail, setShowEmail] = useState(false);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    // if there is any update in steps, please hide chat, 
    // probably we are executing a cell
    setShowChat(false);
  }, [steps]);

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

  if (showChat) {
    return (
      <div className={showBorder? 
       "poc-bg-white dark:poc-bg-slate-700 poc-w-full poc-border-gray-100 poc-border-t poc-border-l poc-border-r poc-rounded-t-md": ""
        
      }>
        <Chat
          variablesStatus={variablesStatus}
          variables={variables}
          setCode={(src: string) => {}}
          metadata={undefined}
          setMetadata={(m: any) => {}}
          isStatic={false}
          fixError={`Explain ${errorName} ${errorValue} for code \n\`\`\`\n${previousCode}\n\`\`\``}
        />
      </div>
    );
  }
  
  const borderClass = showBorder
    ? "poc-bg-white dark:poc-bg-slate-700 poc-p-2 poc-w-full poc-border-gray-100 poc-border-t poc-border-l poc-border-r poc-rounded-t-md"
    : "poc-p-2";

  return (
    <div
      className={`poc-text-base poc-text-gray-900 dark:poc-text-white ${borderClass}`}
    >
      <div className="poc-grid poc-grid-cols-4 poc-gap-4">
        {errorName === "" && (
          <div>
            <label className="poc-block poc-text-lg poc-font-medium ">
              <BoltIcon className="poc-inline poc-pb-1" />
              Execution status
            </label>
            {elements}
          </div>
        )}
        {allSuccess && (
          <div className="poc-col-span-3">
            <p className="poc-py-2 poc-text-base">
              All good 👍
              <button
                type="button"
                className="poc-text-white poc-bg-gradient-to-r poc-from-cyan-500 poc-to-blue-500 hover:poc-bg-gradient-to-bl focus:poc-ring-4 focus:poc-outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 poc-font-medium poc-rounded-lg poc-text-sm poc-px-5 poc-py-1.5 poc-text-center poc-mx-2"
                onClick={() => addCell()}
              >
                <PlusIcon className="poc-inline poc-pb-1" /> Let's add a new
                cell
              </button>
            </p>
          </div>
        )}

        {/* poc-border-t poc-border-l poc-border-r poc-border-red-300 poc-rounded-t-md */}
        {errorName !== "" && (
          <div className=" poc-p-2  poc-text-base poc-col-span-4">
            <p className="poc-block poc-text-lg poc-font-medium poc-text-red-600 ">
              Some problems with code ...
            </p>
            <p className="poc-py-2">
              There was an error during code execution:
            </p>
            <pre className="poc-border poc-p-2 poc-overflow-auto">
              {errorName}
              <br />
              {errorValue}
            </pre>

            <div className="poc-pt-2">
              <button
                type="button"
                className="poc-text-white poc-bg-gradient-to-r poc-from-green-400 poc-via-green-500 poc-to-green-600 hover:poc-bg-gradient-to-br focus:poc-ring-4 focus:poc-outline-none focus:poc-ring-green-300 dark:focus:poc-ring-green-800 poc-font-medium poc-rounded-lg poc-text-sm poc-px-5 poc-py-1.5 poc-text-center poc-my-2"
                onClick={() => setShowChat(true)}
              >
                <WandIcon className="poc-inline poc-pb-1" /> Ask AI Assistant
              </button>
              <button
                type="button"
                className="poc-text-white poc-bg-gradient-to-r poc-from-cyan-400 poc-via-cyan-500 poc-to-cyan-600 hover:poc-bg-gradient-to-br focus:poc-ring-4 focus:poc-outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 poc-font-medium poc-rounded-lg poc-text-sm poc-px-5 poc-py-1.5 poc-text-center poc-my-2 poc-mx-2"
                onClick={() => {
                  setShowEmail(true);
                }}
              >
                <MailIcon className="poc-inline poc-pb-1" /> Email us
              </button>
            </div>
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
