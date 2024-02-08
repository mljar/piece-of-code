import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { ISelectRecipeProps, SelectRecipe } from "./SelectRecipe";
import { allRecipes } from "../recipes";

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
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  runCell: () => console.log("runCell"),
  // allRecipeSets: allRecipes
};
