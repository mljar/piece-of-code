import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { IRecipeProps } from "../base";
import RocCurveRecipe, { RocCurve } from "./rocCurve";

const meta: Meta<typeof RocCurve> = {
  component: RocCurve,
  title: "CodePieces/Scikit-learn/RocCurve",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof RocCurve>;

export const RocCurveStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <RocCurve {...args} />
    <div className="poc-dark">
      <div className="poc-bg-white dark:poc-bg-slate-700 poc-p-2">
        <RocCurve {...args} />
      </div>
    </div>
  </>
);

RocCurveStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variablesStatus: "loaded",
  variables: RocCurveRecipe.defaultVariables,
};

export const RocCurveEmptyDfStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <RocCurve {...args} />
  </>
);
RocCurveEmptyDfStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variablesStatus: "loaded",
  variables: [],
};
