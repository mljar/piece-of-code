import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { APICon } from "./apiConnection";

const meta: Meta<typeof APICon> = {
  component: APICon,
  title: "CodePieces/google-sheets/apiConnection",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof APICon>;

export const APIConForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
  <>
    <APICon {...args} setCode={setCode}/>
    <pre>{code}</pre>
  </>
  )
};
APIConForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
};