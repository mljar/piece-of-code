import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { ReadSheets, ReadSheetsRecipe } from "./reading";

const meta: Meta<typeof ReadSheets> = {
  component: ReadSheets,
  title: "CodePieces/google-sheets/reading",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof ReadSheets>;

export const ReadSheetsForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
  <>
    <ReadSheets {...args} setCode={setCode}/>
    <pre>{code}</pre>
  </>
  )
};
ReadSheetsForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variables: ReadSheetsRecipe.defaultVariables,
  variablesStatus: "loaded",
};