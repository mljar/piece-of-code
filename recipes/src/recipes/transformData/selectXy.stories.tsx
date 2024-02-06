import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { IRecipeProps } from "../base";
import { SelectXy } from "./selectXy";

const meta: Meta<typeof SelectXy> = {
  component: SelectXy,
  title: "CodePieces/selectXy",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof SelectXy>;

export const SelectXyStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <SelectXy {...args} />
  </>
);
SelectXyStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  dataFramesColumns: {
    df: ["col1", "col2", "col3", "col4"],
    df2: ["feature1", "feature2", "feature3", "feature4"],
  },
};


export const SelectXyEmptyDfStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <SelectXy {...args} />
  </>
);
SelectXyEmptyDfStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  dataFramesColumns: {},
};