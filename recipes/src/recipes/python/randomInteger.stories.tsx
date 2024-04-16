import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { IRecipeProps } from "../base";
import { RandomInteger } from "./randomInteger";

const meta: Meta<typeof RandomInteger> = {
  component: RandomInteger,
  title: "CodePieces/Python/RandomInteger",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof RandomInteger>;

export const RandomIntegerStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <RandomInteger {...args} />
  </>
);

RandomIntegerStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
};
