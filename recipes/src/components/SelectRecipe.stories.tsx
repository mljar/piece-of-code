import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { ISelectRecipeProps, SelectRecipe } from "./SelectRecipe";
import { allRecipes } from "../recipes";
import { ExecutionStatus } from "./RunStatus";

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
  </>
);

SelectRecipeForm.args = {
  previousCode: "",
  previousErrorName: "",
  previousErroValue: "",
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
};
