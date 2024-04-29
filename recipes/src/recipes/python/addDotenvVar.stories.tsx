import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { AddDotEnvVar } from "./addDotEnvVar";

const meta: Meta<typeof AddDotEnvVar> = {
  component: AddDotEnvVar,
  title: "CodePieces/Python/AddDotEnvVar",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof AddDotEnvVar>;

export const AddDotEnvVarForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <AddDotEnvVar {...args} />
  </>
);
AddDotEnvVarForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
};
