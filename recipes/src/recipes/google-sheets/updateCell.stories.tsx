import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { UpdateCellRecipe, UpdateCell } from "./updateCell";

const meta: Meta<typeof UpdateCell> = {
  component: UpdateCell,
  title: "CodePieces/google-sheets/updateCell",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof UpdateCell>;

export const UpdateCellForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
    <>
      <UpdateCell {...args} setCode={setCode} />
      <pre>{code}</pre>
    </>
  );
};
UpdateCellForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variables: UpdateCellRecipe.defaultVariables,
  variablesStatus: "loaded",
};