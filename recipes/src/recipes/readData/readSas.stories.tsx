import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { ReadSas } from "./readSas";

const meta: Meta<typeof ReadSas> = {
  component: ReadSas,
  title: "CodePieces/readData/ReadSas",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof ReadSas>;

export const ReadSasForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <ReadSas {...args} />
  </>
);
ReadSasForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
};
