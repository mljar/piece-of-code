import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { FileDelete } from "./fileDelete";

const meta: Meta<typeof FileDelete> = {
  component: FileDelete,
  title: "CodePieces/Python/FileDelete",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof FileDelete>;

export const FileDeleteForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <FileDelete {...args} />
  </>
);
FileDeleteForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
};
