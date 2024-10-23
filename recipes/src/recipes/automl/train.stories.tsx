import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { IRecipeProps } from "../base";
import { Train } from "./train";

const meta: Meta<typeof Train> = {
  component: Train,
  title: "CodePieces/AutoML/Train",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Train>;

export const TrainStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <Train {...args} />
    <Train {...args} hideTitle={true} />
  </>
);

TrainStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  // dataFramesColumns: {
  //   df: ["col1", "col2", "col3", "col4"],
  //   df2: ["feature1", "feature2", "feature3", "feature4"],
  // },
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


export const TrainEmptyStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <Train {...args} />
  </>
);

TrainEmptyStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variablesStatus: "loaded",
  variables: [],
};
