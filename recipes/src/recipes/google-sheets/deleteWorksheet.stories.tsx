import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { DeleteWorkSheetRecipe, DeleteWorkSheet } from "./deleteWorksheet";

const meta: Meta<typeof DeleteWorkSheet> = {
  component: DeleteWorkSheet,
  title: "CodePieces/google-sheets/deleteWorksheet",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof DeleteWorkSheet>;

export const DeleteWorkSheetForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
    <>
      <DeleteWorkSheet {...args} setCode={setCode} />
      <pre>{code}</pre>
    </>
  );
};
DeleteWorkSheetForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variables: DeleteWorkSheetRecipe.defaultVariables,
  variablesStatus: "loaded",
};