import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { OpenSpreadSheet } from "./openSpreadsheet";

const meta: Meta<typeof OpenSpreadSheet> = {
  component: OpenSpreadSheet,
  title: "CodePieces/google-sheets/openSpreadsheet",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof OpenSpreadSheet>;

export const OpenSpreadSheetForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
  <>
    <OpenSpreadSheet {...args} setCode={setCode}/>
    <pre>{code}</pre>
  </>
  )
};
OpenSpreadSheetForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
};