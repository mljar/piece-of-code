import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { DisplayPDF } from "./displayPDF";
import { SearchInPDF } from "./searchInfoInPDF";

const meta: Meta<typeof SearchInPDF> = {
  component: SearchInPDF,
  title: "CodePieces/pdf-operations/SearchInPDF",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof DisplayPDF>;

export const SearchInPDFForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
  <>
    <SearchInPDF {...args} setCode={setCode}/>
    <pre>{code}</pre>
  </>
  )
};
SearchInPDFForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
};