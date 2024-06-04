import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { IRecipeProps } from "../base";
import VisualizeDecisionTreeRecipe, { VisualizeDecisionTree } from "./visualizeDecisionTree";

const meta: Meta<typeof VisualizeDecisionTree> = {
  component: VisualizeDecisionTree,
  title: "CodePieces/Scikit-learn/VisualizeDecisionTree",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof VisualizeDecisionTree>;

export const VisualizeDecisionTreeStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <VisualizeDecisionTree {...args} />
    <div className="poc-dark">
      <div className="poc-bg-white dark:poc-bg-slate-700 poc-p-2">
        <VisualizeDecisionTree {...args} />
      </div>
    </div>
  </>
);

VisualizeDecisionTreeStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variablesStatus: "loaded",
  variables: VisualizeDecisionTreeRecipe.defaultVariables
};

export const VisualizeDecisionTreeEmptyDfStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <VisualizeDecisionTree {...args} />
  </>
);
VisualizeDecisionTreeEmptyDfStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variablesStatus: "loaded",
  variables: [],
};
