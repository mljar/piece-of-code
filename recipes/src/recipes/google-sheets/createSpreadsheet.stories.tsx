import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { CreateSpreadSheet, CreateSpreadSheetRecipe} from "./createSpreadsheet"

const meta: Meta<typeof CreateSpreadSheet> = {
  component: CreateSpreadSheet,
  title: "CodePieces/google-sheets/createSpreadsheet",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof CreateSpreadSheet>;

export const CreateSpreadSheetForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
    <>
      <CreateSpreadSheet {...args} setCode={setCode} />
      <pre>{code}</pre>
    </>
  );
};
CreateSpreadSheetForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variables: CreateSpreadSheetRecipe.defaultVariables,
  variablesStatus: "loaded",
};