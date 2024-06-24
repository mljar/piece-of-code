import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { InstallPackage } from "./installPackage";
import { IRecipeProps } from "../base";

const meta: Meta<typeof InstallPackage> = {
  component: InstallPackage,
  title: "CodePieces/Python/InstallPackage",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof InstallPackage>;

export const InstallPackageForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <InstallPackage {...args} />
  </>
);
InstallPackageForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
};
