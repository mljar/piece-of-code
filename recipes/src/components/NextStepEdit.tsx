import React, { useState } from "react";
import { CodeIcon } from "../icons/Code";
import { ChatIcon } from "../icons/Chat";
import { MailIcon } from "../icons/Mail";
import { CakeIcon } from "../icons/Cake";
import { CakeOffIcon } from "../icons/CakeOff";

export interface INextStepEditProps {
  letsOverwrite: () => void;
}

export const NextStepEdit: React.FC<INextStepEditProps> = ({
  letsOverwrite,
}: INextStepEditProps) => {
  return (
    <div className="border-2 p-4 text-base text-gray-500 dark:text-gray-400 rounded-md">
      <label className="block text-lg font-medium ">
        There is some code here ...
      </label>
      <p className="pt-2">
        Would you like to overwrite this code? You can open or hide Piece of
        Code 🍰
      </p>
      <button
        type="button"
        className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-2"
        onClick={() => letsOverwrite()}
      >
        <CakeIcon className="inline pb-1" /> Let's overwrite
      </button>
      <button
        type="button"
        className="text-gray-600 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-2 mx-2"
        onClick={() => letsOverwrite()}
      >
        <CakeOffIcon className="inline pb-1" /> Hide Piece of Code
      </button>
    </div>
  );
};

export default NextStepEdit;
