import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { FileAppend } from "./fileAppend";

const meta: Meta<typeof FileAppend> = {
  component: FileAppend,
  title: "CodePieces/Python/fileAppend",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof FileAppend>;

export const FileAppendForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <FileAppend {...args} />
  </>
);
FileAppendForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
};
