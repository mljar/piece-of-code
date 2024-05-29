import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { IRecipeProps } from "../base";
import PredictRecipe, { Predict } from "./predict";

const meta: Meta<typeof Predict> = {
  component: Predict,
  title: "CodePieces/Scikit-learn/Predict",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Predict>;

export const PredictStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <Predict {...args} />
    <div className="poc-dark">
      <div className="poc-bg-white dark:poc-bg-slate-700 poc-p-2">
        <Predict {...args} />
      </div>
    </div>
  </>
);

PredictStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variablesStatus: "loaded",
  variables: PredictRecipe.defaultVariables
};

export const PredictEmptyDfStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <Predict {...args} />
  </>
);
PredictEmptyDfStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variablesStatus: "loaded",
  variables: [],
};
