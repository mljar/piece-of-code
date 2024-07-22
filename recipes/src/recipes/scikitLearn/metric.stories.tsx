import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { IRecipeProps } from "../base";
import MetricRecipe, { Metric } from "./metric";

const meta: Meta<typeof Metric> = {
  component: Metric,
  title: "CodePieces/Scikit-learn/Metric",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Metric>;

export const MetricStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
    <>
      <Metric {...args} setCode={setCode}/>
      <pre>{code}</pre>
      <div className="poc-dark">
        <div className="poc-bg-white dark:poc-bg-slate-700 poc-p-2">
          <Metric {...args} setCode={setCode} />
        </div>
      </div>
    </>
  );
};

MetricStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variablesStatus: "loaded",
  variables: MetricRecipe.defaultVariables,
};

export const MetricEmptyDfStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <Metric {...args} />
  </>
);
MetricEmptyDfStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variablesStatus: "loaded",
  variables: [],
};
