import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { IRecipeProps } from "../base";
import { TrainKNN } from "./trainKNN";

const meta: Meta<typeof TrainKNN> = {
  component: TrainKNN,
  title: "CodePieces/Scikit-learn/TrainKNN",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof TrainKNN>;

export const TrainKNNStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <TrainKNN {...args} />
    <div className="poc-dark">
      <div className="poc-bg-white dark:poc-bg-slate-700 poc-p-2">
        <TrainKNN {...args} />
      </div>
    </div>
  </>
);

TrainKNNStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
 
};

export const TrainKNNEmptyDfStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <TrainKNN {...args} />
  </>
);
TrainKNNEmptyDfStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variablesStatus: "loaded",
  variables: [],
};
