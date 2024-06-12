import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { IRecipeProps } from "../base";
import ConfusionMatrixRecipe, { ConfusionMatrix } from "./confusionMatrix";

const meta: Meta<typeof ConfusionMatrix> = {
  component: ConfusionMatrix,
  title: "CodePieces/Scikit-learn/ConfusionMatrix",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof ConfusionMatrix>;

export const ConfusionMatrixStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <ConfusionMatrix {...args} />
    <div className="poc-dark">
      <div className="poc-bg-white dark:poc-bg-slate-700 poc-p-2">
        <ConfusionMatrix {...args} />
      </div>
    </div>
  </>
);

ConfusionMatrixStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variablesStatus: "loaded",
  variables: ConfusionMatrixRecipe.defaultVariables,
};

export const ConfusionMatrixEmptyDfStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <ConfusionMatrix {...args} />
  </>
);
ConfusionMatrixEmptyDfStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variablesStatus: "loaded",
  variables: [],
};
