import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { FolderDelete } from "./folderDelete";

const meta: Meta<typeof FolderDelete> = {
  component: FolderDelete,
  title: "CodePieces/Python/FolderDelete",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof FolderDelete>;

export const FolderDeleteForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <FolderDelete {...args} />
  </>
);
FolderDeleteForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
};
