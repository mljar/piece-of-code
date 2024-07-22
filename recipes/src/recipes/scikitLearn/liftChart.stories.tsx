import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { IRecipeProps } from "../base";
import LiftChartRecipe, { LiftChart } from "./liftChart";

const meta: Meta<typeof LiftChart> = {
  component: LiftChart,
  title: "CodePieces/Scikit-learn/LiftChart",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof LiftChart>;

export const LiftChartStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <LiftChart {...args} />
    <div className="poc-dark">
      <div className="poc-bg-white dark:poc-bg-slate-700 poc-p-2">
        <LiftChart {...args} />
      </div>
    </div>
  </>
);

LiftChartStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variablesStatus: "loaded",
  variables: LiftChartRecipe.defaultVariables,
};

export const LiftChartEmptyDfStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <LiftChart {...args} />
  </>
);
LiftChartEmptyDfStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variablesStatus: "loaded",
  variables: [],
};
