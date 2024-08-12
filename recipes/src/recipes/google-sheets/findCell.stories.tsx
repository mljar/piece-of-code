import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { FindCellRecipe, FindCell } from "./findCell";

const meta: Meta<typeof FindCell> = {
  component: FindCell,
  title: "CodePieces/google-sheets/findCell",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof FindCell>;

export const FindCellForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
    <>
      <FindCell {...args} setCode={setCode} />
      <pre>{code}</pre>
    </>
  );
};
FindCellForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variables: FindCellRecipe.defaultVariables,
  variablesStatus: "loaded",
};