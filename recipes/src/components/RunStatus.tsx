import React, { useState } from "react";
import { IRecipeSet } from "../recipes/base";
import { WalkIcon } from "../icons/Walk";
import { IconProps } from "../icons/props";
import { Welcome } from "./Welcome";
import { allRecipes } from "../recipes";
import { PlayIcon } from "../icons/Play";
import { HomeIcon } from "../icons/Home";
import { TrashIcon } from "../icons/Trash";
import { SpinnerIcon } from "../icons/Spinner";
import { SuccessIcon } from "../icons/Success";
import { ErrorIcon } from "../icons/Error";
import { WarningIcon } from "../icons/Warning";
import { PythonIcon } from "../icons/Python";
import { MarkdownIcon } from "../icons/Markdown";
import { CodeIcon } from "../icons/Code";

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
        <div key={label} className="inline">
          <SuccessIcon className="inline" /><div className="inline"> {label}</div>
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

  return (
    <div className="text-base text-gray-900 dark:text-white border-2 mb-2 p-2 rounded-md">
      <div>
        <label className="block text-lg font-medium ">{label}</label>
        {elements}
      </div>
    </div>
  );
};

export default RunStatus;
