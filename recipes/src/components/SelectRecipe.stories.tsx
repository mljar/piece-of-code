import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { ISelectRecipeProps, SelectRecipe } from "./SelectRecipe";
import { allRecipes } from "../recipes";
import ExecutionStatus from "./ExecutionStatus";

const meta: Meta<typeof SelectRecipe> = {
  component: SelectRecipe,
  title: "CodePieces/SelectRecipe",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof SelectRecipe>;

export const SelectRecipeForm: Story = (
  args: React.JSX.IntrinsicAttributes & ISelectRecipeProps
) => (
  <>
    <SelectRecipe {...args} />
    <h2>Dark theme</h2>
    <div className="poc-dark poc-bg-black poc-p-8">
      <SelectRecipe {...args} />
    </div>
  </>
);

SelectRecipeForm.args = {
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

export const SelectRecipeExecuted: Story = (
  args: React.JSX.IntrinsicAttributes & ISelectRecipeProps
) => (
  <>
    <SelectRecipe {...args} />
  </>
);

SelectRecipeExecuted.args = {
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
