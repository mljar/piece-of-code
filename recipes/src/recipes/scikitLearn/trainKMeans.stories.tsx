import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { IRecipeProps } from "../base";
import { TrainKMeans } from "./trainKMeans";

const meta: Meta<typeof TrainKMeans> = {
  component: TrainKMeans,
  title: "CodePieces/Scikit-learn/TrainKMeans",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof TrainKMeans>;

export const TrainKMeansStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <TrainKMeans {...args} />
    <div className="poc-dark">
      <div className="poc-bg-white dark:poc-bg-slate-700 poc-p-2">
        <TrainKMeans {...args} />
      </div>
    </div>
  </>
);

TrainKMeansStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
 
};

export const TrainKMeansEmptyDfStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <TrainKMeans {...args} />
  </>
);
TrainKMeansEmptyDfStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variablesStatus: "loaded",
  variables: [],
};
