import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { IRecipeProps } from "../base";
import PrecisionRecallRecipe, { PrecisionRecall } from "./precisionRecall";

const meta: Meta<typeof PrecisionRecall> = {
  component: PrecisionRecall,
  title: "CodePieces/Scikit-learn/PrecisionRecall",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof PrecisionRecall>;

export const PrecisionRecallStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <PrecisionRecall {...args} />
    <div className="poc-dark">
      <div className="poc-bg-white dark:poc-bg-slate-700 poc-p-2">
        <PrecisionRecall {...args} />
      </div>
    </div>
  </>
);

PrecisionRecallStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variablesStatus: "loaded",
  variables: PrecisionRecallRecipe.defaultVariables,
};

export const PrecisionRecallEmptyDfStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <PrecisionRecall {...args} />
  </>
);
PrecisionRecallEmptyDfStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variablesStatus: "loaded",
  variables: [],
};
