import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { DisplayPDF } from "./displayPDF";
import { LoadPDF } from "./loadPDF";

const meta: Meta<typeof LoadPDF> = {
  component: LoadPDF,
  title: "CodePieces/pdf-operations/loadPDF",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof DisplayPDF>;

export const LoadPDFForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
  <>
    <LoadPDF {...args} setCode={setCode}/>
    <pre>{code}</pre>
  </>
  )
};
LoadPDFForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
};