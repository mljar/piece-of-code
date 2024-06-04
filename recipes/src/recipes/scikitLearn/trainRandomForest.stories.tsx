import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { IRecipeProps } from "../base";
import { TrainDecisionTree } from "../scikitLearn/trainDescitionTree";

const meta: Meta<typeof TrainDecisionTree> = {
  component: TrainDecisionTree,
  title: "CodePieces/Scikit-learn/TrainDecisionTree",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof TrainDecisionTree>;

export const TrainDecisionTreeStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <TrainDecisionTree {...args} />
    <div className="poc-dark">
      <div className="poc-bg-white dark:poc-bg-slate-700 poc-p-2">
        <TrainDecisionTree {...args} />
      </div>
    </div>
  </>
);

TrainDecisionTreeStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
 
};

export const TrainDecisionTreeEmptyDfStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <TrainDecisionTree {...args} />
  </>
);
TrainDecisionTreeEmptyDfStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variablesStatus: "loaded",
  variables: [],
};
