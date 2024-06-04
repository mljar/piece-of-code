import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { IRecipeProps } from "../base";
import { TrainRandomForest } from "./trainRandomForest";

const meta: Meta<typeof TrainRandomForest> = {
  component: TrainRandomForest,
  title: "CodePieces/Scikit-learn/TrainRandomForest",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof TrainRandomForest>;

export const TrainRandomForestStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <TrainRandomForest {...args} />
    <div className="poc-dark">
      <div className="poc-bg-white dark:poc-bg-slate-700 poc-p-2">
        <TrainRandomForest {...args} />
      </div>
    </div>
  </>
);

TrainRandomForestStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
 
};

export const TrainRandomForestEmptyDfStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <TrainRandomForest {...args} />
  </>
);
TrainRandomForestEmptyDfStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variablesStatus: "loaded",
  variables: [],
};
