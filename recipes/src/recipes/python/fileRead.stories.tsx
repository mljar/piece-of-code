import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { FileRead } from "./fileRead";

const meta: Meta<typeof FileRead> = {
  component: FileRead,
  title: "CodePieces/Python/fileRead",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof FileRead>;

export const FileReadForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <FileRead {...args} />
  </>
);
FileReadForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
};
