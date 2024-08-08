import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { ShareSpreadSheet, ShareSpreadSheetRecipe} from "./shareSpreadsheet"

const meta: Meta<typeof ShareSpreadSheet> = {
  component: ShareSpreadSheet,
  title: "CodePieces/google-sheets/shareSpreadsheet",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof ShareSpreadSheet>;

export const ShareSpreadSheetForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
    <>
      <ShareSpreadSheet {...args} setCode={setCode} />
      <pre>{code}</pre>
    </>
  );
};
ShareSpreadSheetForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variables: ShareSpreadSheetRecipe.defaultVariables,
  variablesStatus: "loaded",
};