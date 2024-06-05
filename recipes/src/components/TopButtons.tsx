import React, { useState } from "react";
import { CodeIcon } from "../icons/Code";
import { ChatIcon } from "../icons/Chat";
import { MailIcon } from "../icons/Mail";
import { CakeIcon } from "../icons/Cake";
import { CakeOffIcon } from "../icons/CakeOff";
import { PlayIcon } from "../icons/Play";
import { TrashIcon } from "../icons/Trash";
import { PlusIcon } from "../icons/Plus";
import { Tooltip } from "react-tooltip";

export interface INextStepEditProps {
  letsOverwrite: () => void;
  runCell: () => void;
  addCell: () => void;
  deleteCell: () => void;
}

export const NextStepEdit: React.FC<INextStepEditProps> = ({
  letsOverwrite,
  runCell,
  addCell,
  deleteCell,
}: INextStepEditProps) => {
  return (
    <div className="poc-border-none poc-text-base poc-text-gray-500 dark:poc-text-gray-400 poc-rounded-md poc-pt-1">
      <Tooltip
        id="top-buttons-tooltip"
        place="top"
        positionStrategy="fixed"
        offset={5}
        style={{ zIndex: "10001" }}
      />
      <div>
        <div className="poc-inline">
          <button
            data-tooltip-id="top-buttons-tooltip"
            data-tooltip-content="Run code"
            type="button"
            className="poc-text-white poc-bg-gradient-to-r poc-from-green-400 poc-via-green-500 poc-to-green-600 hover:poc-bg-gradient-to-br focus:poc-ring-4 focus:poc-outline-none focus:poc-ring-green-300 dark:focus:poc-ring-green-800 poc-font-medium poc-rounded-t-lg poc-text-sm poc-px-5 poc-py-1.5 poc-text-center poc-mx-1"
            onClick={() => runCell()}
          >
            {<PlayIcon className="poc-inline poc-pb-1" />}
          </button>
        </div>
        <div className="poc-inline">
          <button
            data-tooltip-id="top-buttons-tooltip"
            data-tooltip-content="Add new cell below"
            type="button"
            className="poc-text-white poc-bg-gradient-to-r poc-from-cyan-400 poc-via-cyan-500 poc-to-cyan-600 hover:poc-bg-gradient-to-br focus:poc-ring-4 focus:poc-outline-none focus:poc-ring-cyan-300 dark:focus:poc-ring-cyan-800 poc-font-medium poc-rounded-t-lg poc-text-sm poc-px-5 poc-py-1.5 poc-text-center poc-mx-1"
            onClick={() => addCell()}
          >
            <PlusIcon className="poc-inline poc-pb-1" />
          </button>
        </div>
        <div className="poc-inline">
          <button
            data-tooltip-id="top-buttons-tooltip"
            data-tooltip-content="Delete cell"
            type="button"
            className="poc-text-white poc-bg-gradient-to-r poc-from-pink-400 poc-via-pink-500 poc-to-pink-600 hover:poc-bg-gradient-to-br focus:poc-ring-4 focus:poc-outline-none focus:poc-ring-pink-300 dark:focus:poc-ring-pink-800 poc-font-medium poc-rounded-t-lg poc-text-sm poc-px-5 poc-py-1.5 poc-text-center poc-mx-1"
            onClick={() => deleteCell()}
          >
            {<TrashIcon className="poc-inline poc-pb-1" />}
          </button>
        </div>
        <div className="poc-inline">
          <button
            data-tooltip-id="top-buttons-tooltip"
            data-tooltip-content="Open Piece of Code and overwrite with new code"
            type="button"
            className="poc-text-white poc-bg-gradient-to-r poc-from-yellow-400 
            poc-to-yellow-500 hover:poc-bg-gradient-to-br focus:poc-ring-4 focus:poc-outline-none focus:ring-teal-300 dark:focus:ring-teal-800 poc-font-medium poc-rounded-t-lg poc-text-sm poc-px-5 poc-py-1.5 poc-text-center poc-mx-1"
            onClick={() => letsOverwrite()}
          >
            <CakeIcon className="poc-inline poc-pb-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NextStepEdit;
