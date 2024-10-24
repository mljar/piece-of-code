import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { IRecipeProps } from "../base";
import { SplitData } from "./splitData";

const meta: Meta<typeof SplitData> = {
  component: SplitData,
  title: "CodePieces/wrangling/SplitData",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof SplitData>;

export const SplitDataStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <SplitData {...args} />
    {/* <div className="poc-dark">
      <div className="poc-bg-white dark:poc-bg-slate-700 poc-p-2">
        <SplitData {...args} />
      </div>
    </div> */}
  </>
);

SplitDataStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variablesStatus: "loaded",
  variables: [
    {
      varName: "X",
      varType: "DataFrame",
      varColumns: ["col1", "col2", "col3-object", "col4"],
      varColumnTypes: ["int", "int", "object", "int"],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: true,
      isWidget: false,
    },
    {
      varName: "X2",
      varType: "DataFrame",
      varColumns: ["feature1", "feature2-object", "feature3", "feature4"],
      varColumnTypes: ["int", "object", "int", "int"],
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

export const SplitDataEmptyDfStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <SplitData {...args} />
  </>
);
SplitDataEmptyDfStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variablesStatus: "loaded",
  variables: [],
};
