import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { DisplayPDF } from "./displayPDF";

const meta: Meta<typeof DisplayPDF> = {
  component: DisplayPDF,
  title: "CodePieces/pdf-operations/displayPDF",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof DisplayPDF>;

export const DisplayPDFForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
  <>
    <DisplayPDF {...args} setCode={setCode}/>
    <pre>{code}</pre>
  </>
  )
};
DisplayPDFForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
};