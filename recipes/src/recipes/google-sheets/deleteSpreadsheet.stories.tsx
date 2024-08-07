import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { DeleteSpreadSheet, DeleteSpreadSheetRecipe} from "./deleteSpreadsheet"

const meta: Meta<typeof DeleteSpreadSheet> = {
  component: DeleteSpreadSheet,
  title: "CodePieces/google-sheets/deleteSpreadsheet",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof DeleteSpreadSheet>;

export const DeleteSpreadSheetForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
    <>
      <DeleteSpreadSheet {...args} setCode={setCode} />
      <pre>{code}</pre>
    </>
  );
};
DeleteSpreadSheetForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variables: DeleteSpreadSheetRecipe.defaultVariables,
  variablesStatus: "loaded",
};