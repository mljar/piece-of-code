import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { ISelectRecipeLeftProps, SelectRecipeLeft } from "./SelectRecipeLeft";
import { allRecipes } from "../recipes";
import ExecutionStatus from "./ExecutionStatus";

const meta: Meta<typeof SelectRecipeLeft> = {
  component: SelectRecipeLeft,
  title: "CodePieces/SelectRecipeLeft",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof SelectRecipeLeft>;

export const SelectRecipeLeftForm: Story = (
  args: React.JSX.IntrinsicAttributes & ISelectRecipeLeftProps
) => (
  <>
    <SelectRecipeLeft {...args} />
    <h2>Dark theme</h2>
    <div className="poc-dark poc-bg-black poc-p-8">
      <SelectRecipeLeft {...args} />
    </div>
  </>
);

SelectRecipeLeftForm.args = {
  previousCode: "",
  previousErrorName: "",
  previousErrorValue: "",
  previousExecutionCount: 0,
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  runCell: () => console.log("runCell"),
  // executionSteps: [],
  executionSteps: [
    // ["Wait for installation", ExecutionStatus.Wait],
    // ["Install packages", ExecutionStatus.Success],
    // ["Load data", ExecutionStatus.Error],
    // ["Train ML model", ExecutionStatus.Warning],
  ],
  variablesStatus: "loaded",
  variables: [],
  checkPackage: (pkg: string) => {},
  getCellCode: () => "",
};

export const SelectRecipeLeftExecuted: Story = (
  args: React.JSX.IntrinsicAttributes & ISelectRecipeLeftProps
) => (
  <>
    <SelectRecipeLeft {...args} />
  </>
);

SelectRecipeLeftExecuted.args = {
  previousCode: "print(1)",
  previousErrorName: "",
  previousErrorValue: "",
  previousExecutionCount: 1,
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  runCell: () => console.log("runCell"),
  // executionSteps: [],
  executionSteps: [
    // ["Wait for installation", ExecutionStatus.Wait],
    // ["Install packages", ExecutionStatus.Success],
    // ["Load data", ExecutionStatus.Error],
    // ["Train ML model", ExecutionStatus.Warning],
  ],
  variablesStatus: "loaded",
  variables: [],
  checkPackage: (pkg: string) => {},
  getCellCode: () => "",
};
