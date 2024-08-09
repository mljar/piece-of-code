import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { IRecipeProps } from "../base";
import { BarPlot } from "../matplotlib/bar";

const meta: Meta<typeof BarPlot> = {
  component: BarPlot,
  title: "CodePieces/matplotlib/BarPlot",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof BarPlot>;

export const BarPlotStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
    <>
      <BarPlot {...args} setCode={setCode} />
      <div className="poc-dark">
        <div className="poc-bg-white dark:poc-bg-slate-700 poc-p-2">
          <BarPlot {...args} />
        </div>
      </div>
      <pre>{code}</pre>
    </>
  )
};

BarPlotStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variablesStatus: "loaded",
  variables: [
    {
      varName: "X",
      varType: "DataFrame",
      varColumns: ["col1", "col2-obj", "col3-obj", "col4"],
      varColumnTypes: ["int", "object", "object", "int"],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: true,
      isWidget: false,
    },
    {
      varName: "X2",
      varType: "DataFrame",
      varColumns: ["feature1", "feature2", "feature3", "feature4"],
      varColumnTypes: ["int", "int", "int", "int"],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: true,
      isWidget: false,
    },
    {
      varName: "y",
      varType: "Series",
      varColumns: [],
      varColumnTypes: [],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: false,
      isWidget: false,
    },
  ],
};

export const BarPlotEmptyDfStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <BarPlot {...args} />
  </>
);
BarPlotEmptyDfStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variablesStatus: "loaded",
  variables: [],
};


