import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { FileCopy } from "./fileCopy";

const meta: Meta<typeof FileCopy> = {
  component: FileCopy,
  title: "CodePieces/Python/FileCopy",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof FileCopy>;

export const FileCopyForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <FileCopy {...args} />
  </>
);
FileCopyForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
};
