import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { IRecipeProps } from "../base";
import { TimeDelay } from "./timeDelay";


const meta: Meta<typeof TimeDelay> = {
  component: TimeDelay,
  title: "CodePieces/Python/TimeDelay",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof TimeDelay>;

export const TimeDelayStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <TimeDelay {...args} />
  </>
);

TimeDelayStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
};
