import React, { useState } from "react";
import { CodeIcon } from "../icons/Code";

export interface INextStepProps {}

export const NextStepSuccess: React.FC<
  INextStepProps
> = ({}: INextStepProps) => {
  return (
    <div className="border-2 p-4 border-green-300 rounded-md bg-green-50">
      <label className="block text-lg font-medium text-green-600 ">
        Code executed successfully 👍
      </label>
      <p className="py-2 text-base">
        Congratulations, your code is working! 
        <button
          type="button"
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-2"
          // onClick={() => setShowNav(!showNav)}
        >
          <CodeIcon className="inline pb-1" /> Let's add a new cell
        </button>
      </p>
    </div>
  );
};

export default NextStepSuccess;
