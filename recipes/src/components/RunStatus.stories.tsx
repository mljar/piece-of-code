import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import RunStatus, { IRunStatusProps } from "./RunStatus";
import NextStepSuccess from "./NextStepSuccess";
import NextStepError from "./NextStepError";
import NextStepEdit from "./NextStepEdit";
import ExecutionStatus from "./ExecutionStatus";

const meta: Meta<typeof RunStatus> = {
  component: RunStatus,
  title: "CodePieces/RunStatus",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof RunStatus>;

export const RunStatusForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRunStatusProps
) => (
  <>
    <RunStatus {...args} />
    <NextStepEdit
      letsOverwrite={() => console.log("lets overwrite")}
      runCell={() => {}}
      addCell={() => {}}
      deleteCell={() => {}}
    />
    <NextStepSuccess />
    <NextStepError ename={"NameError"} evalue={"name 'app' is not defined"} />
  </>
);

RunStatusForm.args = {
  steps: [
    // ["Wait for installation", ExecutionStatus.Wait],
    ["Install packages", ExecutionStatus.Success],
    ["Run code", ExecutionStatus.Success],
    // ["Load data", ExecutionStatus.Error],
    // ["Train ML model", ExecutionStatus.Warning],
  ],
  errorName: "",
  errorValue: "",
  addCell: () => {},
};


export const RunStatusError: Story = (
  args: React.JSX.IntrinsicAttributes & IRunStatusProps
) => (
  <>
    <RunStatus {...args} />
  </>
);

RunStatusError.args = {
  steps: [
    // ["Wait for installation", ExecutionStatus.Wait],
    ["Install packages", ExecutionStatus.Success],
    // ["Run code", ExecutionStatus.Success],
    ["Load data", ExecutionStatus.Error],
    // ["Train ML model", ExecutionStatus.Warning],
  ],
  errorName: "Bad error",
  errorValue: "Very bad error",
  addCell: () => {},
};
