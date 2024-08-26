import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { IRecipeProps } from "../base";
import TrainModelRecipe, { TrainModel } from "./trainModel";

const meta: Meta<typeof TrainModel> = {
  component: TrainModel,
  title: "CodePieces/Scikit-learn/TrainModel",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof TrainModel>;

export const TrainModelStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
    <>
      <TrainModel {...args} setCode={setCode} />
      <div className="poc-dark">
        <div className="poc-bg-white dark:poc-bg-slate-700 poc-p-2">
          <TrainModel {...args} />
        </div>
      </div>
      <pre>{code}</pre>
    </>
  )
};

TrainModelStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variablesStatus: "loaded",
  variables: TrainModelRecipe.defaultVariables
};

export const TrainModelEmptyDfStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <TrainModel {...args} />
  </>
);
TrainModelEmptyDfStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variablesStatus: "loaded",
  variables: [],
};
