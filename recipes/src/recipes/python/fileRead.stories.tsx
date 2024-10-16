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
    <FileRead {...args} hideTitle={true} />

    <div className="poc-dark poc-bg-black poc-p-8">
      <FileRead {...args} />
    </div>
  </>
);
FileReadForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
};
