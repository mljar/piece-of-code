import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { IRecipeProps } from "../base";
import { Predict } from "./predict";

const meta: Meta<typeof Predict> = {
  component: Predict,
  title: "CodePieces/AutoML/Predict",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Predict>;

export const PredictStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <Predict {...args} />
  </>
);

PredictStory.args = {
  setCode: (src: string) => console.log(src),
  variablesStatus: "loaded",
  variables: [
    {
      varName: "my_automl",
      varType: "AutoML",
      varColumns: [],
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
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: false,
      isWidget: false,
    },
    {
      varName: "df",
      varType: "DataFrame",
      varColumns: ["col1", "col2"],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: false,
      isWidget: false,
    },
  ],
};

export const PredictEmptyStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <Predict {...args} />
  </>
);

PredictEmptyStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variablesStatus: "loaded",
  variables: [],
};
