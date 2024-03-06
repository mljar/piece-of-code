import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { IRecipeProps } from "../base";
import { LoadAutoML } from "./load";

const meta: Meta<typeof LoadAutoML> = {
  component: LoadAutoML,
  title: "CodePieces/AutoML/Load",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof LoadAutoML>;

export const LoadStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <LoadAutoML {...args} />
  </>
);

LoadStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variablesStatus: "loaded",
  variables: [],
};
