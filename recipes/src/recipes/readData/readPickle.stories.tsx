import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { ReadPickle } from "./readPickle";

const meta: Meta<typeof ReadPickle> = {
  component: ReadPickle,
  title: "CodePieces/readData/ReadPickle",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof ReadPickle>;

export const ReadPickleForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <ReadPickle {...args} />
  </>
);
ReadPickleForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
};
