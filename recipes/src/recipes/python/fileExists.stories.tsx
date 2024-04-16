import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { FileExists } from "./fileExists";
import { IRecipeProps } from "../base";

const meta: Meta<typeof FileExists> = {
  component: FileExists,
  title: "CodePieces/Python/fileExists",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof FileExists>;

export const ListFilesForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <FileExists {...args} />
  </>
);
ListFilesForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
};
