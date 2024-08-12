import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { CreateWorkSheetRecipe, CreateWorkSheet } from "./createWorksheet";

const meta: Meta<typeof CreateWorkSheet> = {
  component: CreateWorkSheet,
  title: "CodePieces/google-sheets/createWorksheet",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof CreateWorkSheet>;

export const CreateWorkSheetForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
    <>
      <CreateWorkSheet {...args} setCode={setCode} />
      <pre>{code}</pre>
    </>
  );
};
CreateWorkSheetForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variables: CreateWorkSheetRecipe.defaultVariables,
  variablesStatus: "loaded",
};