import React, { useState } from "react";
import { CodeIcon } from "../icons/Code";
import { ChatIcon } from "../icons/Chat";
import { MailIcon } from "../icons/Mail";
import { CakeIcon } from "../icons/Cake";
import { CakeOffIcon } from "../icons/CakeOff";
import { PlayIcon } from "../icons/Play";
import { TrashIcon } from "../icons/Trash";
import { PlusIcon } from "../icons/Plus";

export interface INextStepEditProps {
  letsOverwrite: () => void;
}

export const NextStepEdit: React.FC<INextStepEditProps> = ({
  letsOverwrite,
}: INextStepEditProps) => {
  return (
    <div className="border-none text-base text-gray-500 dark:text-gray-400 rounded-md">
      <p className="pt-4">
        <div className="has-tooltip inline">
          <span className="tooltip rounded shadow-lg p-1 bg-slate-800 text-gray-50 -mt-7 text-sm">
            Run code
          </span>
          <button
            type="button"
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-t-lg text-sm px-5 py-1.5 text-center mx-1"
            onClick={() => console.log("run")}
          >
            {<PlayIcon className="inline pb-1" />}
          </button>
        </div>
        <div className="has-tooltip inline">
          <span className="tooltip rounded shadow-lg p-1 bg-slate-800 text-gray-50 -mt-7 text-sm">
            Add cell
          </span>
          <button
            type="button"
            className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-t-lg text-sm px-5 py-1.5 text-center mx-1"
            onClick={() => letsOverwrite()}
          >
            <PlusIcon className="inline pb-1" />
          </button>
        </div>
        <div className="has-tooltip inline">
          <span className="tooltip rounded shadow-lg p-1 bg-slate-800 text-gray-50 -mt-7 text-sm">
            Overwrite
          </span>
          <button
            type="button"
            className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-t-lg text-sm px-5 py-1.5 text-center mx-1"
            onClick={() => letsOverwrite()}
          >
            <CakeIcon className="inline pb-1" />
          </button>
        </div>
        <div className="has-tooltip inline">
          <span className="tooltip rounded shadow-lg p-1 bg-slate-800 text-gray-50 -mt-7 text-sm">
            Delete cell
          </span>
          <button
            type="button"
            className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-t-lg text-sm px-5 py-1.5 text-center mx-1"
            onClick={() => {}}
          >
            {<TrashIcon className="inline pb-1" />}
          </button>
        </div>
      </p>
    </div>
  );
};

export default NextStepEdit;
