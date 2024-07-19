import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { IRecipeProps } from "../base";
import CalibrationPlotRecipe, { CalibrationPlot } from "./calibrationPlot";

const meta: Meta<typeof CalibrationPlot> = {
  component: CalibrationPlot,
  title: "CodePieces/Scikit-learn/CalibrationPlot",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof CalibrationPlot>;

export const CalibrationPlotStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <CalibrationPlot {...args} />
    <div className="poc-dark">
      <div className="poc-bg-white dark:poc-bg-slate-700 poc-p-2">
        <CalibrationPlot {...args} />
      </div>
    </div>
  </>
);

CalibrationPlotStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variablesStatus: "loaded",
  variables: CalibrationPlotRecipe.defaultVariables,
};

export const CalibrationPlotEmptyDfStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <CalibrationPlot {...args} />
  </>
);
CalibrationPlotEmptyDfStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variablesStatus: "loaded",
  variables: [],
};
