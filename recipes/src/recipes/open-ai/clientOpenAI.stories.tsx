import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { Client } from "./clientOpenAI";

const meta: Meta<typeof Client> = {
  component: Client,
  title: "CodePieces/open-ai/clientOpenAI",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Client>;

export const ClientForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
  <>
    <Client {...args} setCode={setCode}/>
    <pre>{code}</pre>
  </>
  )
};
ClientForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
};