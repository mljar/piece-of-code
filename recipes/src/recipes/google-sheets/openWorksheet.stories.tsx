import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { OpenWorkSheet, OpenWorkSheetRecipe} from "./openWorksheet"

const meta: Meta<typeof OpenWorkSheet> = {
  component: OpenWorkSheet,
  title: "CodePieces/google-sheets/openWorksheet",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof OpenWorkSheet>;

export const OpenWorkSheetForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
    <>
      <OpenWorkSheet {...args} setCode={setCode} />
      <pre>{code}</pre>
    </>
  );
};
OpenWorkSheetForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variables: OpenWorkSheetRecipe.defaultVariables,
  variablesStatus: "loaded",
};