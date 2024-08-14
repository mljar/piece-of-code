import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { UpdateRangeRecipe, UpdateRange } from "./updateRange";

const meta: Meta<typeof UpdateRange> = {
  component: UpdateRange,
  title: "CodePieces/google-sheets/updateRange",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof UpdateRange>;

export const UpdateRangeForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
    <>
      <UpdateRange {...args} setCode={setCode} />
      <pre>{code}</pre>
    </>
  );
};
UpdateRangeForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variables: UpdateRangeRecipe.defaultVariables,
  variablesStatus: "loaded",
};