import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { DisplayPDF } from "./displayPDF";
import { LoadPDF } from "./loadPDF";
import { LoadManyPDF } from "./loadManyPDF";

const meta: Meta<typeof LoadManyPDF> = {
  component: LoadManyPDF,
  title: "CodePieces/pdf-operations/loadManyPDF",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof DisplayPDF>;

export const LoadManyPDFForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
  <>
    <LoadManyPDF {...args} setCode={setCode}/>
    <pre>{code}</pre>
  </>
  )
};
LoadManyPDFForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
};