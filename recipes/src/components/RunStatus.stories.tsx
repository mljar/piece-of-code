import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import RunStatus, { ExecutionStatus, IRunStatusProps } from "./RunStatus";
import NextStepSuccess from "./NextStepSuccess";
import NextStepError from "./NextStepError";
import NextStepEdit from "./NextStepEdit";

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
    <NextStepEdit letsOverwrite={() => console.log("lets overwrite")} />
    <NextStepSuccess />
    <NextStepError ename={"NameError"} evalue={"name 'app' is not defined"} />
  </>
);

RunStatusForm.args = {
  label: "Run code",
  steps: [
    ["Wait for installation", ExecutionStatus.Wait],
    ["Install packages", ExecutionStatus.Success],
    ["Load data", ExecutionStatus.Error],
    ["Train ML model", ExecutionStatus.Warning],
  ],
};
