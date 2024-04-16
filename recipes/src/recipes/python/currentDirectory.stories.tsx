import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { CurrentDirectory } from "./currentDirectory";

const meta: Meta<typeof CurrentDirectory> = {
  component: CurrentDirectory,
  title: "CodePieces/Python/CurrentDirectory",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof CurrentDirectory>;

export const CurrentDirectoryForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <CurrentDirectory {...args} />
  </>
);
CurrentDirectoryForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
};
