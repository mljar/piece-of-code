import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { IRecipeProps } from "../base";
import { Train } from "./train";

const meta: Meta<typeof Train> = {
  component: Train,
  title: "CodePieces/Train",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Train>;

export const TrainStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <Train {...args} />
  </>
);
TrainStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  dataFramesColumns: {
    df: ["col1", "col2", "col3", "col4"],
    df2: ["feature1", "feature2", "feature3", "feature4"],
  },
  variables: {
    X: "pd.DataFrame",
    X1: "pd.DataFrame",
    y: "pd.Series",
    y1: "pd.Series",
    xx: "other type",
  },
};

