import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { ReadSpss } from "./readSpss";

const meta: Meta<typeof ReadSpss> = {
  component: ReadSpss,
  title: "CodePieces/readData/ReadSpss",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof ReadSpss>;

export const ReadSpssForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <ReadSpss {...args} />
  </>
);
ReadSpssForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
};
