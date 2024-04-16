import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { EnvironmentVars } from "./environmentVars";

const meta: Meta<typeof EnvironmentVars> = {
  component: EnvironmentVars,
  title: "CodePieces/Python/EnvironmentVars",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof EnvironmentVars>;

export const EnvironmentVarsForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <EnvironmentVars {...args} />
  </>
);
EnvironmentVarsForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
};
