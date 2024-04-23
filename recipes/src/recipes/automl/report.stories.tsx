import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { IRecipeProps } from "../base";
import { AutoMLReport } from "./report";

const meta: Meta<typeof AutoMLReport> = {
  component: AutoMLReport,
  title: "CodePieces/AutoML/AutoMLReport",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof AutoMLReport>;

export const TrainStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <AutoMLReport {...args} />
  </>
);

TrainStory.args = {
  setCode: (src: string) => console.log(src),
  variablesStatus: "loaded",
  variables: [
    {
      varName: "my_automl",
      varType: "AutoML",
      varColumns: [],
      varColumnTypes: [],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: false,
      isWidget: false,
    },
    {
      varName: "automl2",
      varType: "AutoML",
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

export const AutoMLReportEmptyStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <AutoMLReport {...args} />
  </>
);

AutoMLReportEmptyStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variablesStatus: "loaded",
  variables: [],
};
