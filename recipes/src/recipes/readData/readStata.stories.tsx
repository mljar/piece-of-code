import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { ReadStata } from "./readStata";

const meta: Meta<typeof ReadStata> = {
  component: ReadStata,
  title: "CodePieces/readData/ReadStata",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof ReadStata>;

export const ReadStataForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <ReadStata {...args} />
  </>
);
ReadStataForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
};
