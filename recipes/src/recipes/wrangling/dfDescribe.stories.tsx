import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { IRecipeProps } from "../base";
import { DfDescribe } from "./dfDescribe";

const meta: Meta<typeof DfDescribe> = {
  component: DfDescribe,
  title: "CodePieces/wrangling/DfDescribe",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof DfDescribe>;

export const DfDescribeStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <DfDescribe {...args} />
    <div className="poc-dark">
      <div className="poc-bg-white dark:poc-bg-slate-700 poc-p-2">
        <DfDescribe {...args} />
      </div>
    </div>
  </>
);

DfDescribeStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variablesStatus: "loaded",
  variables: [
    {
      varName: "X",
      varType: "DataFrame",
      varColumns: ["col1", "col2", "col3", "col4"],
      varColumnTypes: ["int", "int", "int", "int"],
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

export const DfDescribeEmptyDfStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <DfDescribe {...args} />
  </>
);
DfDescribeEmptyDfStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variablesStatus: "loaded",
  variables: [],
};
