import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { ReadFeather } from "./readFeather";

const meta: Meta<typeof ReadFeather> = {
  component: ReadFeather,
  title: "CodePieces/readData/ReadFeather",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof ReadFeather>;

export const ReadFeatherForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <ReadFeather {...args} />
  </>
);

ReadFeatherForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
};
