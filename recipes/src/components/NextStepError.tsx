import React, { useState } from "react";
import { CodeIcon } from "../icons/Code";
import { ChatIcon } from "../icons/Chat";
import { MailIcon } from "../icons/Mail";

export interface INextStepErrorProps {
  ename: string;
  evalue: string;
}

export const NextStepError: React.FC<INextStepErrorProps> = ({
  ename,
  evalue,
}: INextStepErrorProps) => {
  const [showEmail, setShowEmail] = useState(false);
  return (
    <div className="border-2 p-4 border-red-300 rounded-md bg-red-50">
      <label className="block text-lg font-medium text-red-600 ">
        Some problems with code ...
      </label>
      <p className="py-2">There was an error during code execution:</p>

      <pre className="border-2 p-2">
        {ename}
        <br />
        {evalue}
      </pre>
      <p className="pt-2">Any idea why? Do you need more help:</p>

      <button
        type="button"
        className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-2"
      >
        <ChatIcon className="inline pb-1" /> Ask on forum
      </button>

      <button
        type="button"
        className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-2 mx-2"
        onClick={() => {
          setShowEmail(true);
        }}
      >
        <MailIcon className="inline pb-1" /> Write email to us
      </button>
      {showEmail && (
        <p className="text-lg">
          Our email address is <b>contact@mljar.com</b> please include the error
          message and describe your use case.
        </p>
      )}
    </div>
  );
};

export default NextStepError;
