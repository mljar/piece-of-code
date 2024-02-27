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
    <div className="border-none text-base text-gray-500 dark:text-gray-400 rounded-md">
      <Tooltip
        id="top-buttons-tooltip"
        place="top"
        positionStrategy="fixed"
        offset={5}
        style={{ zIndex: "10001" }}
      />
      <div>
        <div className="inline">
          <button
            data-tooltip-id="top-buttons-tooltip"
            data-tooltip-content="Run code"
            type="button"
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-t-lg text-sm px-5 py-1.5 text-center mx-1"
            onClick={() => runCell()}
          >
            {<PlayIcon className="inline pb-1" />}
          </button>
        </div>
        <div className="inline">
          <button
            data-tooltip-id="top-buttons-tooltip"
            data-tooltip-content="Add new cell below"
            type="button"
            className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-t-lg text-sm px-5 py-1.5 text-center mx-1"
            onClick={() => addCell()}
          >
            <PlusIcon className="inline pb-1" />
          </button>
        </div>
        <div className="inline">
          <button
            data-tooltip-id="top-buttons-tooltip"
            data-tooltip-content="Open Piece of Code and overwrite with new code"
            type="button"
            className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-t-lg text-sm px-5 py-1.5 text-center mx-1"
            onClick={() => letsOverwrite()}
          >
            <CakeIcon className="inline pb-1" />
          </button>
        </div>
        <div className="inline">
          <button
            data-tooltip-id="top-buttons-tooltip"
            data-tooltip-content="Delete cell"
            type="button"
            className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-t-lg text-sm px-5 py-1.5 text-center mx-1"
            onClick={() => deleteCell()}
          >
            {<TrashIcon className="inline pb-1" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NextStepEdit;
