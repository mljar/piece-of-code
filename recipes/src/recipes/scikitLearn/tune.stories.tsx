import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { IRecipeProps } from "../base";
import TuneRecipe, { Tune } from "./tune";

const meta: Meta<typeof Tune> = {
  component: Tune,
  title: "CodePieces/Scikit-learn/Tune",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Tune>;

export const TuneStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <Tune {...args} />
    <div className="poc-dark">
      <div className="poc-bg-white dark:poc-bg-slate-700 poc-p-2">
        <Tune {...args} />
      </div>
    </div>
  </>
);

TuneStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variablesStatus: "loaded",
  variables: TuneRecipe.defaultVariables
};

export const TuneEmptyDfStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <Tune {...args} />
  </>
);
TuneEmptyDfStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variablesStatus: "loaded",
  variables: [],
};
